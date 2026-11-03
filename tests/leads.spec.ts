import { test, expect } from "@playwright/test";
import { createLeadHandler, type LeadServices } from "../src/server/lead-handler";
import { readConfig, sheetHeaders, type Env } from "../src/server/lead-config";
import { readAttribution } from "../src/lib/leads";
import { LeadError, validateLead } from "../src/server/lead-validation";
import { leadRecord, mappedValues, sheetStore, type SheetsPort, googleSheetsPort, type GoogleSheetsClient } from "../src/server/lead-sheets";
import { escapeHtml, leadMail, notifyLead } from "../src/server/lead-mail";
import type { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { redisStore } from "../src/server/lead-redis";

const input = { name: "Persona ficticia", academy: "Academia de prueba", email: "prueba@example.com", phone: "+34 600 000 000", students: "51-200", landing: "plugin", requestId: "12345678-1234-4234-8234-123456789abc", website: "", attribution: { utm_source: "meta" }, pathname: "/plugin", privacyNoticeVersion: "landing-v1" };
// Fila 2 y estado ficticio SOLO en tests; ambos siguen sin confirmar en configuración.
const env: Env = {
  APP_URL: "http://localhost:3000", LEADS_SHEETS_WRITES_ENABLED: "true",
  GOOGLE_SERVICE_ACCOUNT_EMAIL: "test@example.iam.gserviceaccount.com", GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\\nficticia\\n-----END PRIVATE KEY-----",
  GOOGLE_SPREADSHEET_ID: "17E_ejZKmoQYxw1xzY_0e3QK-kNtB-4kJY7D7DVX733c", GOOGLE_SHEET_ID: "897385192", GOOGLE_SHEET_NAME: "CP David Parte 2", GOOGLE_SHEET_HEADER_ROW: "2", LEADS_INITIAL_STATUS: "Estado ficticio",
  SMTP_HOST: "smtp.ionos.es", SMTP_PORT: "465", SMTP_SECURE: "true", SMTP_USER: "test@example.com", SMTP_PASSWORD: "ficticia", SMTP_FROM: "test@example.com", LEADS_NOTIFICATION_TO: "info@duxbrain.ai",
  UPSTASH_REDIS_REST_URL: "https://ficticio.upstash.io", UPSTASH_REDIS_REST_TOKEN: "ficticio", LEADS_HASH_SECRET: "ficticio-de-prueba-32-caracteres-largos", NODE_ENV: "test",
};
const config = () => readConfig(env);
const request = (body: unknown = input, headers: Record<string, string> = {}) => new Request("http://localhost:3000/api/leads", { method: "POST", headers: { origin: "http://localhost:3000", "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
function fixture(overrides: Partial<LeadServices> = {}, environment = env) {
  const calls: string[] = [], logs: { code: string; id?: string }[] = [];
  const services: LeadServices = {
    async rateLimit() { calls.push("rate"); }, hash() { return "hash-ficticio"; }, async reserve() { calls.push("reserve"); return null; },
    async setState(_id, _hash, state) { calls.push(`state:${state}`); },
    async preflight() { calls.push("preflight"); }, async append(r) { calls.push("append"); expect(r.estado).toBe("Estado ficticio"); expect(r.lead_id).toBe(`web_${input.requestId}`); return 55; },
    async notify() { calls.push("notify"); }, async setNotification(_id, _hash, state) { calls.push(`notification:${state}`); }, ...overrides,
  };
  return { calls, logs, handler: createLeadHandler({ env: environment, services: () => services, log: (code, id) => logs.push({ code, id }) }) };
}
const originalFetch = globalThis.fetch;
test.beforeEach(() => { globalThis.fetch = async () => { throw new Error("Real network is forbidden in these tests"); }; });
test.afterEach(() => { globalThis.fetch = originalFetch; });

test("éxito: guarda antes de notificar y devuelve UUID confirmado", async () => {
  const f = fixture(); const response = await f.handler(request());
  expect(response.status).toBe(200); expect((await response.json()).leadId).toBe(input.requestId);
  expect(f.calls).toEqual(["rate", "preflight", "reserve", "append", "state:saved", "notification:sending", "notify", "notification:sent"]);
});
test("datos inválidos no acceden a servicios", async () => {
  for (const patch of [{ email: "mal" }, { name: "x" }, { academy: "a".repeat(151) }, { phone: "abc" }, { landing: "otra" }, { requestId: "no-uuid" }, { students: "999999" }, { attribution: { utm_source: "x".repeat(251) } }, { email: "uno@example.com\r\nBcc:otro@example.com" }]) {
    const f = fixture(); expect((await f.handler(request({ ...input, ...patch }))).status).toBe(400); expect(f.calls).toEqual([]);
  }
});
test("configuración ausente, bloqueo de escritura y mapeo ausente nunca simulan éxito", async () => {
  for (const patch of [{ SMTP_PASSWORD: "" }, { GOOGLE_SHEET_NAME: "" }, { GOOGLE_SHEET_HEADER_ROW: "" }, { LEADS_INITIAL_STATUS: "" }, { LEADS_SHEETS_WRITES_ENABLED: "false" }, { UPSTASH_REDIS_REST_TOKEN: "" }]) {
    const f = fixture({}, { ...env, ...patch }); const response = await f.handler(request()); expect(response.status).toBe(503); expect((await response.json()).ok).toBe(false); expect(f.calls).toEqual([]);
  }
});
test("fallo de Sheets: sin confirmación ni SMTP y estado incierto", async () => {
  const f = fixture({ async append() { throw new Error("fallo simulado"); } });
  const response = await f.handler(request()); expect(response.status).toBe(502); expect((await response.json()).code).toBe("SHEETS_UNCERTAIN"); expect(f.calls).toContain("state:uncertain"); expect(f.calls).not.toContain("notify");
});
test("SMTP falla después de guardar: confirma recepción y conserva notificación pendiente", async () => {
  const f = fixture({ async notify() { throw new Error("password=never-log-me"); } });
  const response = await f.handler(request()); expect(response.status).toBe(200); expect((await response.json()).ok).toBe(true); expect(f.calls).toContain("append"); expect(f.calls).toContain("notification:pending"); expect(f.calls).not.toContain("notification:sent"); expect(f.logs).toEqual([{ code: "NOTIFICATION_PENDING", id: input.requestId }]);
});
test("fallo al actualizar estado de aviso no pierde la recepción", async () => {
  const f = fixture({ async setNotification(_id, _hash, state) { if (state === "sent") throw new Error("simulado"); } }); expect((await f.handler(request())).status).toBe(200); expect(f.logs[0].code).toBe("NOTIFICATION_STATUS_PENDING");
});
test("fallo Redis tras guardar no cambia recepción", async () => {
  const f = fixture({ async setState() { throw new Error("simulado"); } }); expect((await f.handler(request())).status).toBe(200); expect(f.logs[0].code).toBe("IDEMPOTENCY_STATE_FAILED");
});
test("reintento de UUID guardado no duplica fila ni aviso", async () => {
  const f = fixture({ async reserve() { return { hash: "hash-ficticio", state: "saved" }; } }); expect((await f.handler(request())).status).toBe(200); expect(f.calls).not.toContain("append"); expect(f.calls).not.toContain("notify");
});
test("UUID concurrente, incierto o con payload diferente no vuelve a escribir", async () => {
  for (const state of ["processing", "uncertain", "saved"] as const) {
    const f = fixture({ async reserve() { return { hash: state === "saved" ? "otro" : "hash-ficticio", state }; } }); expect((await f.handler(request())).status).toBe(409); expect(f.calls).not.toContain("append");
  }
});
test("origen, honeypot, tipo y tamaño de cuerpo protegidos", async () => {
  const cases: [Request, number][] = [[request(input, { origin: "https://otro.example" }), 403], [request(input, { "sec-fetch-site": "cross-site" }), 403], [request({ ...input, website: "spam" }), 400], [request(input, { "content-type": "text/plain" }), 415], [request({ ...input, extra: "x".repeat(9000) }), 413], [request(input, { "content-length": "9000" }), 413]];
  for (const [req, status] of cases) { const f = fixture(); expect((await f.handler(req)).status).toBe(status); expect(f.calls).toEqual([]); }
});
test("rate limit devuelve Retry-After y no escribe", async () => {
  const f = fixture({ async rateLimit() { throw new LeadError(429, "RATE_LIMIT", "Espera"); } }); const r = await f.handler(request()); expect(r.status).toBe(429); expect(r.headers.get("Retry-After")).toBe("600"); expect(f.calls).toEqual([]);
});
test("estructura desconfirmada bloquea antes de reservar/escribir", async () => {
  const f = fixture({ async preflight() { throw new Error("mismatch"); } }); expect((await f.handler(request())).status).toBe(503); expect(f.calls).toEqual(["rate"]);
});
test("config valida destino fijo, clave multilínea y proxy en producción", () => {
  expect(config().privateKey).toContain("\nficticia\n");
  for (const patch of [{ GOOGLE_SHEET_ID: "0" }, { GOOGLE_SPREADSHEET_ID: "otra" }, { SMTP_FROM: "x\r\nBcc:evil" }, { NODE_ENV: "production", LEADS_TRUSTED_IP_HEADER: "" }]) expect(() => readConfig({ ...env, ...patch })).toThrow();
});
test("fila exacta A:T: vacíos sin inferencia, teléfono texto y estado comercial configurado", () => {
  const record = leadRecord(validateLead(input), "2026-11-03T10:00:00.000Z", config().initialStatus);
  const values = mappedValues(record);
  expect(values).toEqual([`web_${input.requestId}`, "2026-11-03T10:00:00.000Z", "", "", "", "", "", "", "web_plugin", "DuxBrain Web - Plugin", "", "web", "", "", "51-200", input.email, input.name, "+34 600 000 000", "", "Estado ficticio"]);
  expect(values).toHaveLength(20); expect(typeof values[17]).toBe("string");
});
test("adapter Sheets comprueba gid, nombre y cabeceras antes del append", async () => {
  const c = config(); const calls: string[] = [];
  const port: SheetsPort = {
    async metadata() { return [{ id: c.sheetId, title: c.sheetName }]; },
    async read(range) { expect(range).toBe("'CP David Parte 2'!2:2"); return [[...sheetHeaders]]; },
    async append(range, values) { calls.push(range); expect(values[0]).toBe(`web_${input.requestId}`); expect(values).toHaveLength(20); return "'CP David Parte 2'!A55:T55"; },
  };
  const store = sheetStore(c, port); await store.preflight(); expect(await store.append(leadRecord(validateLead(input), "fecha", c.initialStatus))).toBe(55); expect(calls).toEqual(["'CP David Parte 2'!A:T"]);
  await expect(sheetStore(c, { ...port, async metadata() { return [{ id: 0, title: c.sheetName }]; } }).preflight()).rejects.toThrow("TAB_MISMATCH");
  await expect(sheetStore(c, { ...port, async read() { return [["cabeceras diferentes"]]; } }).preflight()).rejects.toThrow("SCHEMA_MISMATCH");
  await expect(sheetStore(c, { ...port, async metadata() { return [{ id: c.sheetId, title: "Otro nombre" }]; } }).preflight()).rejects.toThrow("TAB_MISMATCH");
  for (const headers of [[...sheetHeaders, "extra"], sheetHeaders.slice(0, 19), [...sheetHeaders].reverse()]) {
    await expect(sheetStore(c, { ...port, async read() { return [headers]; } }).preflight()).rejects.toThrow("SCHEMA_MISMATCH");
  }
});
test("Google adapter transmite RAW y desactiva reintentos automáticos", async () => {
  const calls: { params: Record<string, unknown>; opts: Record<string, unknown> }[] = [];
  const fake = { spreadsheets: { values: {
    async append(params: Record<string, unknown>, opts: Record<string, unknown>) { calls.push({ params, opts }); return { data: { updates: { updatedRange: "'CP David Parte 2'!A55:T55", updatedRows: 1 } } }; },
  } } } as unknown as GoogleSheetsClient;
  const port = googleSheetsPort(config(), fake);
  const values = ["=1+1", "@prueba", ...Array(18).fill("")];
  await port.append("'CP David Parte 2'!A:T", values);
  await expect(port.append("'CP David Parte 2'!A:T", ["incompleta"])).rejects.toThrow("INVALID_ROW_WIDTH");
  expect(calls[0].params.valueInputOption).toBe("RAW"); expect(calls[0].params.insertDataOption).toBe("INSERT_ROWS");
  expect(calls[0].params.requestBody).toEqual({ values: [values] });
  for (const call of calls) { expect(call.opts.retry).toBe(false); expect(call.opts.timeout).toBe(8000); }
});
test("correo escapa HTML y remitente/destino proceden del servidor", () => {
  const lead = validateLead({ ...input, name: '<b>Persona</b>', from: 'intruso@example.com', to: 'intruso@example.com' });
  const mail = leadMail(config(), leadRecord(lead, "fecha", config().initialStatus));
  expect(mail.html).toContain("&lt;b&gt;Persona&lt;/b&gt;"); expect(mail.html).not.toContain("<b>Persona</b>"); expect(mail.from).toBe(env.SMTP_FROM); expect(mail.to).toBe("info@duxbrain.ai"); expect(mail.replyTo).toBe(input.email); expect(escapeHtml('&<>"\'')).toBe("&amp;&lt;&gt;&quot;&#39;");
});
test("Redis REST usa reserva NX con TTL y no hace fallback a memoria", async () => {
  const commands: unknown[][] = [];
  globalThis.fetch = async (_url, options) => { commands.push(JSON.parse(String(options?.body))); return Response.json({ result: "OK" }); };
  const store = redisStore(config()); expect(await store.reserve(validateLead(input), "hash")).toBe(null); expect(commands[0]).toContain("NX"); expect(commands[0]).toContain(604800);
  globalThis.fetch = async () => { throw new Error("offline"); };
  await expect(store.rateLimit(request())).rejects.toThrow("offline");
});
test("SMTP simulado comprueba TLS, destinatario aceptado y cierre", async () => {
  let closed = false;
  const factory = (options: SMTPTransport.Options) => {
    expect(options.host).toBe("smtp.ionos.es"); expect(options.port).toBe(465); expect(options.secure).toBe(true);
    expect(options.connectionTimeout).toBe(5000); expect(options.socketTimeout).toBe(8000); expect(options.logger).toBe(false);
    return { async sendMail(mail: ReturnType<typeof leadMail>) { expect(mail.replyTo).toBe(input.email); return { accepted: [env.LEADS_NOTIFICATION_TO], rejected: [] }; }, close() { closed = true; } } as unknown as Transporter<SMTPTransport.SentMessageInfo>;
  };
  await notifyLead(config(), leadRecord(validateLead(input), "fecha", config().initialStatus), factory); expect(closed).toBe(true);
  await expect(notifyLead(config(), leadRecord(validateLead(input), "fecha", config().initialStatus), () => ({ async sendMail() { return { accepted: [], rejected: [env.LEADS_NOTIFICATION_TO] }; }, close() {} }) as unknown as Transporter<SMTPTransport.SentMessageInfo>)).rejects.toThrow("SMTP_NOT_ACCEPTED");
});

test("atribución pagada explícita: IDs independientes de UTM y plataforma normalizada", () => {
  const a = readAttribution("?utm_source=ig&utm_medium=paid_social&utm_campaign=NombreUTM&utm_content=ContenidoUTM&ad_id=123&ad_name=Anuncio&adset_id=456&adset_name=Grupo&campaign_id=789&campaign_name=Campana&platform=instagram");
  const record = leadRecord(validateLead({ ...input, attribution: a }), "fecha", "Estado ficticio");
  expect(mappedValues(record).slice(2, 8)).toEqual(["123", "Anuncio", "456", "Grupo", "789", "Campana"]);
  expect(mappedValues(record)[10]).toBe(false); expect(record.platform).toBe("instagram");
  const withoutIds = leadRecord(validateLead({ ...input, attribution: { utm_content: "123", utm_campaign: "789" } }), "fecha", "Estado ficticio");
  expect(withoutIds.ad_id).toBe(""); expect(withoutIds.campaign_id).toBe(""); expect(withoutIds.is_organic).toBe("");
});
test("atribución desconocida, contradictoria o no pagada no inventa origen ni organicidad", () => {
  for (const attribution of [{}, { utm_source: "meta" }, { ad_id: "123" }, { utm_medium: "organic" }, { utm_source: "desconocido" }, { utm_source: "facebook", platform: "instagram" }]) {
    const r = leadRecord(validateLead({ ...input, attribution }), "fecha", "Estado ficticio");
    expect(r.is_organic).toBe(""); expect(r.platform).toBe("web");
  }
  for (const [source, normalized] of [["FB", "facebook"], ["ig", "instagram"]]) {
    expect(leadRecord(validateLead({ ...input, attribution: { utm_source: source } }), "fecha", "Estado ficticio").platform).toBe(normalized);
  }
});
test("las tres landings solo cambian form_id/form_name, nunca respuestas personales", () => {
  for (const [landing, id, name] of [["plugin", "web_plugin", "DuxBrain Web - Plugin"], ["campus", "web_campus", "DuxBrain Web - Campus"], ["campus-secure", "web_campus_secure", "DuxBrain Web - Campus Secure"]]) {
    const values = mappedValues(leadRecord(validateLead({ ...input, landing }), "fecha", "Estado ficticio"));
    expect(values.slice(8, 10)).toEqual([id, name]); expect(values.slice(12, 14)).toEqual(["", ""]); expect(values[18]).toBe("");
  }
});
test("academia y seis UTM van al correo y no ocupan columnas de otro significado", () => {
  const attribution = { utm_source: "fuente-prueba", utm_medium: "medio-prueba", utm_campaign: "camp-prueba", utm_content: "contenido-prueba", utm_term: "termino-prueba", utm_id: "utm-id-prueba" };
  const record = leadRecord(validateLead({ ...input, attribution }), "fecha", "Estado ficticio");
  const mail = leadMail(config(), record), values = mappedValues(record);
  expect(mail.text).toContain(input.academy); expect(values).not.toContain(input.academy);
  for (const value of Object.values(attribution)) { expect(mail.text).toContain(value); expect(values).not.toContain(value); }
});
test("parámetros explícitos validados y limitados; marcadores sin resolver descartados", () => {
  expect(readAttribution(`?ad_id=${"1".repeat(65)}&utm_content=${"a".repeat(251)}`)).toEqual({});
  for (const attribution of [{ ad_id: "abc" }, { campaign_id: "1".repeat(65) }, { ad_name: "x".repeat(251) }, { platform: "x".repeat(33) }, { adset_name: "x\nBcc" }]) expect(() => validateLead({ ...input, attribution })).toThrow();
  const lead = validateLead({ ...input, attribution: { ad_id: "{{ad.id}}", utm_source: "{{site_source_name}}" } });
  expect(lead.attribution).toEqual({});
});
test("reintentos mantienen web_UUID y no repiten append; fecha es la del servidor", async () => {
  let saved = false, appends = 0, firstId = "";
  const f = fixture({ async reserve() { return saved ? { hash: "hash-ficticio", state: "saved", notification: "sent" } : null; }, async append(record) { appends++; firstId = record.lead_id; expect(record.fecha_utc).toMatch(/^\d{4}-\d\d-\d\dT.*Z$/); saved = true; return 55; } });
  await f.handler(request({ ...input, created_time: "fecha-inventada" })); await f.handler(request(input));
  expect(firstId).toBe(`web_${input.requestId}`); expect(appends).toBe(1);
  expect(leadRecord(validateLead(input), "otra fecha", "Estado ficticio").lead_id).toBe(firstId);
});
test("estado técnico SMTP persistido en Redis, nunca en lead_status", async () => {
  const commands: (string | number)[][] = [];
  globalThis.fetch = async (_url, options) => { const command = JSON.parse(String(options?.body)); commands.push(command); return Response.json({ result: command[0] === "SET" ? "OK" : 1 }); };
  const store = redisStore(config()); await store.reserve(validateLead(input), "hash"); await store.setState(input.requestId, "hash", "saved"); await store.setNotification(input.requestId, "hash", "sent");
  expect(JSON.parse(String(commands[0][2])).notification).toBe("pending");
  expect(commands[1][1]).toContain("r.state=ARGV[2]"); expect(commands[1][1]).not.toContain("r.notification=");
  expect(commands[2][1]).toContain("r.notification=ARGV[2]"); expect(commands[2][1]).toContain("KEEPTTL");
  expect(mappedValues(leadRecord(validateLead(input), "fecha", "Estado ficticio"))[19]).toBe("Estado ficticio");
});
