import { emailPattern, LeadError } from "./lead-validation";

export const sheetHeaders = ["id", "created_time", "ad_id", "ad_name", "adset_id", "adset_name", "campaign_id", "campaign_name", "form_id", "form_name", "is_organic", "platform", "¿tienes_academia_online?", "¿te_gustaría_tener_un_campus_online?", "¿cuántos_alumnos_tienes?", "email", "full_name", "phone_number", "website", "lead_status"] as const;
export type Env = Record<string, string | undefined>;

export function unavailable(): never { throw new LeadError(503, "NOT_CONFIGURED", "La recepción de solicitudes no está disponible: falta completar la configuración. Inténtalo más tarde."); }
export function readConfig(env: Env) {
  const required = (key: string) => env[key]?.trim() || unavailable();
  let origin: string;
  try { const u = new URL(required("APP_URL")); if (!["http:", "https:"].includes(u.protocol) || u.username || u.password || u.pathname !== "/" || u.search || u.hash) return unavailable(); origin = u.origin; } catch { return unavailable(); }
  if (env.LEADS_SHEETS_WRITES_ENABLED !== "true") return unavailable();
  const privateKey = required("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n");
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----") || !privateKey.includes("-----END PRIVATE KEY-----")) return unavailable();
  const headerRow = Number(required("GOOGLE_SHEET_HEADER_ROW"));
  if (!Number.isSafeInteger(headerRow) || headerRow < 1) return unavailable();
  const initialStatus = required("LEADS_INITIAL_STATUS");
  if (initialStatus.length > 100 || /[\x00-\x1f\x7f]/.test(initialStatus)) return unavailable();
  if (required("GOOGLE_SHEET_NAME") !== "CP David Parte 2") return unavailable();
  const spreadsheetId = required("GOOGLE_SPREADSHEET_ID"), sheetId = Number(required("GOOGLE_SHEET_ID"));
  if (spreadsheetId !== "17E_ejZKmoQYxw1xzY_0e3QK-kNtB-4kJY7D7DVX733c" || sheetId !== 897385192) return unavailable();
  const serviceEmail = required("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const smtpUser = required("SMTP_USER"), from = required("SMTP_FROM"), to = required("LEADS_NOTIFICATION_TO");
  if (![serviceEmail, smtpUser, from, to].every(v => emailPattern.test(v) && !v.includes(".."))) return unavailable();
  const port = Number(required("SMTP_PORT"));
  if (env.SMTP_HOST !== "smtp.ionos.es" || port !== 465 || env.SMTP_SECURE !== "true") return unavailable();
  const redisUrl = required("UPSTASH_REDIS_REST_URL");
  try { const u = new URL(redisUrl); if (u.protocol !== "https:" || u.username || u.password || u.pathname !== "/" || u.search || u.hash) return unavailable(); } catch { return unavailable(); }
  const secret = required("LEADS_HASH_SECRET");
  if (secret.length < 32) return unavailable();
  const trustedIpHeader = env.LEADS_TRUSTED_IP_HEADER?.trim().toLowerCase() ?? "";
  if ((env.NODE_ENV === "production" && !trustedIpHeader) || (trustedIpHeader && !/^[a-z0-9-]+$/.test(trustedIpHeader))) return unavailable();
  return { origin, spreadsheetId, sheetId, sheetName: required("GOOGLE_SHEET_NAME"), headerRow, initialStatus, serviceEmail, privateKey, smtp: { host: env.SMTP_HOST, port, secure: true, user: smtpUser, password: required("SMTP_PASSWORD"), from, to }, redisUrl, redisToken: required("UPSTASH_REDIS_REST_TOKEN"), secret, trustedIpHeader };
}
export type LeadConfig = ReturnType<typeof readConfig>;
