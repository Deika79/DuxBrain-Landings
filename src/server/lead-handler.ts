import { readConfig, type Env, type LeadConfig } from "./lead-config";
import { LeadError, readBody, validateLead } from "./lead-validation";
import { leadRecord, type LeadRecord } from "./lead-sheets";
import type { Reservation, NotificationState } from "./lead-redis";
import type { ValidLead } from "./lead-validation";

export type LeadServices = {
  rateLimit(request: Request): Promise<void>;
  hash(lead: ValidLead): string;
  reserve(lead: ValidLead, hash: string): Promise<Reservation | null>;
  setState(id: string, hash: string, state: Reservation["state"]): Promise<void>;
  setNotification(id: string, hash: string, state: NotificationState): Promise<void>;
  preflight(): Promise<void>;
  append(record: LeadRecord): Promise<number>;
  notify(record: LeadRecord): Promise<void>;
};
type Dependencies = { env: Env; services(config: LeadConfig): LeadServices; log?: (code: string, id?: string) => void };
const receipt = (id: string) => ({ ok: true, leadId: id, message: "Hemos recibido tu solicitud. El equipo de DuxBrain se pondrá en contacto contigo." });
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "600" } : {}) } });

export function createLeadHandler(deps: Dependencies) {
  return async (request: Request) => {
    let id: string | undefined;
    try {
      let origin: string;
      try { origin = new URL(deps.env.APP_URL ?? "").origin; } catch { throw new LeadError(503, "NOT_CONFIGURED", "Falta completar la configuración del formulario."); }
      if (request.headers.get("origin") !== origin || request.headers.get("sec-fetch-site") === "cross-site") throw new LeadError(403, "ORIGIN", "El origen de la solicitud no está permitido.");
      const lead = validateLead(await readBody(request));
      id = lead.requestId;
      const config = readConfig(deps.env);
      const services = deps.services(config);
      await services.rateLimit(request);
      const hash = services.hash(lead);
      // Fallar antes de reservar si faltan nombre/columnas o cambió la estructura.
      try { await services.preflight(); } catch { throw new LeadError(503, "SHEET_STRUCTURE", "La recepción de solicitudes no está disponible: la estructura de la hoja está pendiente de revisión."); }
      const previous = await services.reserve(lead, hash);
      if (previous) {
        if (previous.hash !== hash) throw new LeadError(409, "ID_CONFLICT", "Este identificador corresponde a otra solicitud. Contacta con info@duxbrain.ai indicando la referencia.");
        if (previous.state === "saved") return json(receipt(id));
        throw new LeadError(409, "RECEIPT_UNCERTAIN", "Esta solicitud está en proceso o pendiente de comprobación. No la reenvíes; contacta con info@duxbrain.ai indicando la referencia.");
      }
      const record = leadRecord(lead, new Date().toISOString(), config.initialStatus);
      try { await services.append(record); }
      catch {
        try { await services.setState(id, hash, "uncertain"); } catch { deps.log?.("IDEMPOTENCY_STATE_FAILED", id); }
        throw new LeadError(502, "SHEETS_UNCERTAIN", "No podemos confirmar la recepción. No reenvíes la solicitud; contacta con info@duxbrain.ai indicando la referencia para comprobarla.");
      }
      try { await services.setState(id, hash, "saved"); } catch { deps.log?.("IDEMPOTENCY_STATE_FAILED", id); }
      try {
        await services.setNotification(id, hash, "sending");
        await services.notify(record);
        try { await services.setNotification(id, hash, "sent"); } catch { deps.log?.("NOTIFICATION_STATUS_PENDING", id); }
      } catch {
        try { await services.setNotification(id, hash, "pending"); } catch { deps.log?.("NOTIFICATION_STATUS_PENDING", id); }
        deps.log?.("NOTIFICATION_PENDING", id);
      }
      // Sheets es el registro principal: SMTP nunca invalida una recepción confirmada.
      return json(receipt(id));
    } catch (error) {
      if (error instanceof LeadError) return json({ ok: false, code: error.code, message: error.message, ...(id ? { leadId: id } : {}) }, error.status);
      deps.log?.("LEADS_SERVICE_UNAVAILABLE", id);
      return json({ ok: false, code: "UNAVAILABLE", message: "El servicio no está disponible temporalmente. Conserva la referencia antes de volver a intentarlo.", ...(id ? { leadId: id } : {}) }, 503);
    }
  };
}
