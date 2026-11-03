import type { LeadPayload } from "../lib/leads";
import { attributionKeys, attributionLimit } from "../lib/leads";

export class LeadError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export type ValidLead = LeadPayload & { requestId: string; website: string };
export const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export function validateLead(input: unknown): ValidLead {
  const invalid = () => { throw new LeadError(400, "INVALID_FIELDS", "Revisa los campos del formulario y sus formatos."); };
  if (!object(input)) return invalid();
  function field(key: string, max: number, min = 1) {
    const v = input as Record<string, unknown>;
    if (typeof v[key] !== "string") return invalid();
    const value = (v[key] as string).trim();
    if (value.length < min || value.length > max || /[\x00-\x1f\x7f]/.test(value)) return invalid();
    return value;
  }
  const name = field("name", 100, 2), academy = field("academy", 150, 2);
  const email = field("email", 254), phone = field("phone", 30, 7);
  if (!emailPattern.test(email) || email.includes("..") || !/^\+?[0-9 () .-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) return invalid();
  const landing = field("landing", 20);
  if (!["plugin", "campus", "campus-secure"].includes(landing)) return invalid();
  const students = field("students", 12);
  if (!["1-50", "51-200", "201-500", "501-1000", "1000+"].includes(students)) return invalid();
  const requestId = field("requestId", 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return invalid();
  const website = field("website", 200, 0);
  if (website) throw new LeadError(400, "INVALID_REQUEST", "No se ha podido aceptar la solicitud.");
  if (!object(input.attribution)) return invalid();
  const attribution: LeadPayload["attribution"] = {};
  for (const key of attributionKeys) {
    const v = input.attribution[key];
    if (v === undefined) continue;
    if (typeof v !== "string" || v.length > attributionLimit(key) || /[\x00-\x1f\x7f]/.test(v)) return invalid();
    const value = v.trim();
    // Marcadores dinámicos sin resolver no son atribución. No guardarlos.
    if (/\{\{|\}\}/.test(value)) continue;
    if (/^(ad|adset|campaign)_id$/.test(key) && value && !/^[0-9]+$/.test(value)) return invalid();
    attribution[key] = value;
  }
  // La ruta y versión del aviso no se confían al navegador.
  return { name, academy, email, phone, students, landing: landing as ValidLead["landing"], requestId, website, attribution, pathname: `/${landing}`, privacyNoticeVersion: "landing-v1" };
}

export async function readBody(request: Request): Promise<unknown> {
  const limit = 8192;
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) throw new LeadError(415, "CONTENT_TYPE", "El formulario debe enviarse como JSON.");
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > limit)) throw new LeadError(413, "BODY_LIMIT", "La solicitud supera el tamaño permitido.");
  if (!request.body) throw new LeadError(400, "INVALID_JSON", "Solicitud vacía.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; void reader.cancel().catch(() => {}); }, 5000);
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { void reader.cancel().catch(() => {}); throw new LeadError(413, "BODY_LIMIT", "La solicitud supera el tamaño permitido."); }
      chunks.push(value);
    }
    if (timedOut) throw new LeadError(408, "BODY_TIMEOUT", "La lectura del formulario ha tardado demasiado. Vuelve a intentarlo.");
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (e) {
    if (e instanceof LeadError) throw e;
    throw new LeadError(400, "INVALID_JSON", "No se ha podido leer la solicitud.");
  } finally { clearTimeout(timer); reader.releaseLock(); }
}
