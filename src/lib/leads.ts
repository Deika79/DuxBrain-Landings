import type { LandingId } from "@/content/landings";

export const privacyUrl = "https://duxbrain.ai/es/privacy";
export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "ad_id", "ad_name", "adset_id", "adset_name", "campaign_id", "campaign_name", "platform"] as const;
export function attributionLimit(key: string) { return /^(ad|adset|campaign)_id$/.test(key) ? 64 : key === "platform" ? 32 : 250; }
export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>>;
export type LeadPayload = {
  name: string; academy: string; email: string; phone: string; students: string;
  landing: LandingId; attribution: Attribution; pathname: string; privacyNoticeVersion: string;
  requestId: string; website: string;
};

export function readAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  return Object.fromEntries(attributionKeys.flatMap((key) => {
    const value = params.get(key)?.trim();
    // No truncar IDs o UTM: una etiqueta parcial sería una atribución falsa.
    if (value && value.length > attributionLimit(key)) return [];
    return value ? [[key, value]] : [];
  }));
}

export class SubmissionError extends Error {
  constructor(message: string, public uncertain = false) { super(message); }
}
export async function submitLead(payload: LeadPayload): Promise<{ message: string; leadId: string }> {
  let response: Response;
  try {
    response = await fetch("/api/leads", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(100000),
    });
  } catch {
    throw new SubmissionError("No podemos confirmar la recepción por un problema de conexión. No reenvíes la solicitud; contacta con info@duxbrain.ai indicando la referencia.", true);
  }
  let result;
  try { result = await response.json(); }
  catch { throw new SubmissionError("La respuesta no ha podido verificarse. Contacta con info@duxbrain.ai indicando la referencia.", true); }
  if (!result || typeof result !== "object") throw new SubmissionError("La respuesta no ha podido verificarse. Contacta con info@duxbrain.ai indicando la referencia.", true);
  if (!response.ok || result.ok !== true) {
    const knownBeforeWrite = ["NOT_CONFIGURED", "SHEET_STRUCTURE", "PROXY_CONFIGURATION"].includes(result.code);
    throw new SubmissionError(typeof result.message === "string" ? result.message : "No se ha podido recibir la solicitud.", ["SHEETS_UNCERTAIN", "RECEIPT_UNCERTAIN", "ID_CONFLICT", "UNAVAILABLE"].includes(result.code) || (response.status >= 500 && !knownBeforeWrite));
  }
  if (result.leadId !== payload.requestId || typeof result.message !== "string") throw new SubmissionError("La recepción necesita comprobarse. Contacta con info@duxbrain.ai indicando la referencia.", true);
  return result;
}
