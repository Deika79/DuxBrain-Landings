import { auth, sheets } from "googleapis/build/src/apis/sheets";
import { sheetHeaders, type LeadConfig } from "./lead-config";
import type { ValidLead } from "./lead-validation";

export type LeadRecord = {
  lead_id: string; fecha_utc: string; estado: string; nombre: string; academia: string;
  email: string; telefono: string; numero_alumnos: string; landing: string;
  utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string; utm_term: string; utm_id: string;
  ad_id: string; ad_name: string; adset_id: string; adset_name: string; campaign_id: string; campaign_name: string;
  form_id: string; form_name: string; is_organic: false | ""; platform: string;
};
export type SheetValue = string | false;
export type SheetsPort = {
  metadata(): Promise<{ id: number | null | undefined; title: string | null | undefined }[]>;
  read(range: string): Promise<unknown[][]>;
  append(range: string, values: SheetValue[]): Promise<string>;
};
export type GoogleSheetsClient = ReturnType<typeof sheets>;
export function googleSheetsPort(config: LeadConfig, client: GoogleSheetsClient = sheets({ version: "v4", auth: new auth.JWT({ email: config.serviceEmail, key: config.privateKey, scopes: ["https://www.googleapis.com/auth/spreadsheets"], transporterOptions: { timeout: 8000, retry: false } }) })): SheetsPort {
  const opts = () => ({ timeout: 8000, retry: false, signal: AbortSignal.timeout(10000) });
  return {
    async metadata() {
      const r = await client.spreadsheets.get({ spreadsheetId: config.spreadsheetId, fields: "sheets(properties(sheetId,title))" }, opts());
      return (r.data.sheets ?? []).map(s => ({ id: s.properties?.sheetId, title: s.properties?.title }));
    },
    async read(range) { const r = await client.spreadsheets.values.get({ spreadsheetId: config.spreadsheetId, range }, opts()); return r.data.values ?? []; },
    async append(range, values) {
      if (values.length !== 20) throw new Error("INVALID_ROW_WIDTH");
      const r = await client.spreadsheets.values.append({ spreadsheetId: config.spreadsheetId, range, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: [values] }, includeValuesInResponse: false }, opts());
      if (!r.data.updates?.updatedRange || r.data.updates.updatedRows !== 1) throw new Error("APPEND_UNCERTAIN");
      return r.data.updates.updatedRange;
    },
  };
}
const forms = {
  plugin: { id: "web_plugin", name: "DuxBrain Web - Plugin" },
  campus: { id: "web_campus", name: "DuxBrain Web - Campus" },
  "campus-secure": { id: "web_campus_secure", name: "DuxBrain Web - Campus Secure" },
};
export function webLeadId(requestId: string) { return `web_${requestId}`; }
function normalizePlatform(value: string | undefined) {
  const aliases: Record<string, string> = { fb: "facebook", facebook: "facebook", ig: "instagram", instagram: "instagram" };
  return aliases[value?.toLowerCase().trim() ?? ""];
}
export function leadRecord(lead: ValidLead, date: string, initialStatus: string): LeadRecord {
  const a = lead.attribution;
  // Conflicto entre plataforma explícita y utm_source: no elegir una por conjetura.
  const platform = normalizePlatform(a.platform), source = normalizePlatform(a.utm_source);
  const knownPlatform = platform && source && platform !== source ? "web" : platform ?? source ?? "web";
  const paid = ["paid", "paid_social", "social_paid", "cpc", "ppc", "cpm"].includes(a.utm_medium?.trim().toLowerCase() ?? "");
  return {
    lead_id: webLeadId(lead.requestId), fecha_utc: date, estado: initialStatus,
    nombre: lead.name, academia: lead.academy, email: lead.email, telefono: lead.phone, numero_alumnos: lead.students, landing: lead.landing,
    utm_source: a.utm_source ?? "", utm_medium: a.utm_medium ?? "", utm_campaign: a.utm_campaign ?? "", utm_content: a.utm_content ?? "", utm_term: a.utm_term ?? "", utm_id: a.utm_id ?? "",
    ad_id: a.ad_id ?? "", ad_name: a.ad_name ?? "", adset_id: a.adset_id ?? "", adset_name: a.adset_name ?? "", campaign_id: a.campaign_id ?? "", campaign_name: a.campaign_name ?? "",
    form_id: forms[lead.landing].id, form_name: forms[lead.landing].name, is_organic: paid ? false : "", platform: knownPlatform,
  };
}
export function mappedValues(record: LeadRecord): SheetValue[] {
  // Contrato confirmado A:T. M, N y S vacíos; academia y UTM solo por correo.
  return [record.lead_id, record.fecha_utc, record.ad_id, record.ad_name, record.adset_id, record.adset_name, record.campaign_id, record.campaign_name,
    record.form_id, record.form_name, record.is_organic, record.platform, "", "", record.numero_alumnos, record.email, record.nombre, record.telefono, "", record.estado];
}
export function sheetStore(config: LeadConfig, port: SheetsPort = googleSheetsPort(config)) {
  const tab = `'${config.sheetName.replace(/'/g, "''")}'`;
  const range = `${tab}!A:T`;
  return {
    async preflight() {
      const metadata = await port.metadata();
      if (!metadata.some(s => s.id === config.sheetId && s.title === config.sheetName)) throw new Error("TAB_MISMATCH");
      // Leer fila completa para detectar también cabeceras extra fuera de A:T.
      const rows = await port.read(`${tab}!${config.headerRow}:${config.headerRow}`);
      if (rows.length !== 1 || rows[0].length !== 20 || sheetHeaders.some((header, i) => rows[0][i] !== header)) throw new Error("SCHEMA_MISMATCH");
    },
    async append(record: LeadRecord) {
      const updated = await port.append(range, mappedValues(record));
      const match = /!A(\d+):T(\d+)$/.exec(updated);
      if (!match || match[1] !== match[2] || Number(match[1]) <= config.headerRow) throw new Error("APPEND_RANGE_UNCERTAIN");
      return Number(match[1]);
    },
  };
}
