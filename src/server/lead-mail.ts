import nodemailer, { type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { LeadConfig } from "./lead-config";
import type { LeadRecord } from "./lead-sheets";

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
export function leadMail(config: LeadConfig, record: LeadRecord) {
  // Incluye academia y las seis UTM aunque no tengan columna en la hoja.
  const entries = Object.entries(record).map(([key, value]) => [key, String(value)]);
  return {
    from: config.smtp.from, to: config.smtp.to, replyTo: record.email,
    subject: `Solicitud de demo DuxBrain · ${record.lead_id}`,
    messageId: `<lead-${record.lead_id}@${config.smtp.from.split("@")[1]}>`,
    text: entries.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h1>Nueva solicitud de demo</h1><table>${entries.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table>`,
  };
}
export async function notifyLead(config: LeadConfig, record: LeadRecord, factory: (options: SMTPTransport.Options) => Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport) {
  const transport = factory({
    host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.password },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 8000, dnsTimeout: 5000,
    disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
    tls: { minVersion: "TLSv1.2" },
  });
  const controller = new AbortController();
  const deadline = setTimeout(() => { controller.abort(); transport.close(); }, 12000);
  try {
    const result = await Promise.race([
      transport.sendMail(leadMail(config, record)),
      new Promise<never>((_, reject) => controller.signal.addEventListener("abort", () => reject(new Error("SMTP_TIMEOUT")), { once: true })),
    ]);
    if (!result.accepted?.includes(config.smtp.to) || result.rejected?.length) throw new Error("SMTP_NOT_ACCEPTED");
  } finally { clearTimeout(deadline); transport.close(); }
}
