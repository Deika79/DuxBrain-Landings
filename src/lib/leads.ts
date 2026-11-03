import type { LandingId } from "@/content/landings";

export const privacyUrl = "https://duxbrain.ai/es/privacy";
export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"] as const;
export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>>;
export type LeadPayload = {
  name: string; academy: string; email: string; phone: string; students: string;
  landing: LandingId; attribution: Attribution; pathname: string; privacyNoticeVersion: string;
};

export function readAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  return Object.fromEntries(attributionKeys.flatMap((key) => {
    const value = params.get(key)?.trim().slice(0, 250);
    return value ? [[key, value]] : [];
  }));
}

export async function submitLead(payload: LeadPayload): Promise<never> {
  // TODO(FORM-INTEGRATION): validar en servidor y enviar al destino real aprobado.
  // No fetch, logs, persistencia ni respuesta de éxito hasta conectar el servicio.
  void payload;
  throw new Error("El formulario todavía no está conectado. No se han enviado ni guardado tus datos.");
}
