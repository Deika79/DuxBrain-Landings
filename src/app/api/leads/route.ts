import { createLeadHandler } from "@/server/lead-handler";
import { digest, redisStore } from "@/server/lead-redis";
import { sheetStore } from "@/server/lead-sheets";
import { notifyLead } from "@/server/lead-mail";

export const runtime = "nodejs";
export const maxDuration = 120;
export const POST = createLeadHandler({
  env: process.env,
  services(config) {
    const redis = redisStore(config), sheet = sheetStore(config);
    return { ...redis, ...sheet, hash: lead => digest(config, JSON.stringify(lead)), notify: record => notifyLead(config, record) };
  },
  // Solo códigos y UUID, nunca errores del proveedor, secretos ni datos de contacto.
  log: (code, id) => console.warn("leads", { code, requestId: id }),
});
