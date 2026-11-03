import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import type { LeadConfig } from "./lead-config";
import { LeadError, type ValidLead } from "./lead-validation";

export type NotificationState = "pending" | "sending" | "sent";
export type Reservation = { hash: string; state: "processing" | "saved" | "uncertain"; notification?: NotificationState };
export function digest(config: LeadConfig, value: string) { return createHmac("sha256", config.secret).update(value).digest("hex"); }
export function redisStore(config: LeadConfig) {
  async function command(args: (string | number)[]) {
    const response = await fetch(config.redisUrl, { method: "POST", headers: { Authorization: `Bearer ${config.redisToken}`, "Content-Type": "application/json" }, body: JSON.stringify(args), signal: AbortSignal.timeout(4000), cache: "no-store" });
    if (!response.ok) throw new Error("REDIS_UNAVAILABLE");
    const data = await response.json();
    if (data.error) throw new Error("REDIS_COMMAND_FAILED");
    return data.result as unknown;
  }
  const key = (id: string) => `duxbrain:lead:v1:${id}`;
  return {
    async rateLimit(request: Request) {
      let ip = "local-development";
      if (config.trustedIpHeader) {
        ip = request.headers.get(config.trustedIpHeader)?.trim() ?? "";
        // Solo IP única: configurar cabecera canónica del proxy, no listas arbitrarias.
        if (!isIP(ip)) throw new LeadError(503, "PROXY_CONFIGURATION", "El formulario no está disponible temporalmente.");
      }
      const bucket = Math.floor(Date.now() / 600000);
      const lua = "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],660) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],660) end; if a>5 or b>200 then return 0 end; return 1";
      const allowed = await command(["EVAL", lua, 2, `duxbrain:rate:${bucket}:${digest(config, ip)}`, `duxbrain:global:${bucket}`]);
      if (allowed !== 1) throw new LeadError(429, "RATE_LIMIT", "Has realizado demasiados intentos. Espera diez minutos antes de volver a intentarlo.");
    },
    async reserve(lead: ValidLead, hash: string): Promise<Reservation | null> {
      const result = await command(["SET", key(lead.requestId), JSON.stringify({ hash, state: "processing", notification: "pending" }), "NX", "EX", 604800]);
      if (result === "OK") return null;
      const current = await command(["GET", key(lead.requestId)]);
      if (typeof current !== "string") throw new Error("RESERVATION_UNCERTAIN");
      return JSON.parse(current) as Reservation;
    },
    async setState(id: string, hash: string, state: Reservation["state"]) {
      // Actualizar un campo sin borrar el estado técnico de SMTP ni recrear reservas.
      const lua = "local s=redis.call('GET',KEYS[1]); if not s then return 0 end; local r=cjson.decode(s); if r.hash~=ARGV[1] then return 0 end; r.state=ARGV[2]; redis.call('SET',KEYS[1],cjson.encode(r),'KEEPTTL'); return 1";
      if (await command(["EVAL", lua, 1, key(id), hash, state]) !== 1) throw new Error("RESERVATION_STATE_UNCERTAIN");
    },
    async setNotification(id: string, hash: string, state: NotificationState) {
      const lua = "local s=redis.call('GET',KEYS[1]); if not s then return 0 end; local r=cjson.decode(s); if r.hash~=ARGV[1] then return 0 end; r.notification=ARGV[2]; redis.call('SET',KEYS[1],cjson.encode(r),'KEEPTTL'); return 1";
      if (await command(["EVAL", lua, 1, key(id), hash, state]) !== 1) throw new Error("NOTIFICATION_STATE_UNCERTAIN");
    },
  };
}
