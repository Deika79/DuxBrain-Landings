"use client";

import { useRef, useState, type FormEvent } from "react";
import type { LandingId } from "@/content/landings";
import { privacyUrl, readAttribution, submitLead, type LeadPayload } from "@/lib/leads";

export function LeadForm({ landing }: { landing: LandingId }) {
  const [message, setMessage] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      name: String(data.get("name")).trim(), academy: String(data.get("academy")).trim(),
      email: String(data.get("email")).trim(), phone: String(data.get("phone")).trim(),
      students: String(data.get("students")), landing,
      attribution: readAttribution(window.location.search), pathname: window.location.pathname,
      privacyNoticeVersion: "landing-v1",
    };
    try { await submitLead(payload); }
    catch (error) {
      setMessage(error instanceof Error ? error.message : "No se ha podido enviar la solicitud.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  return <div className="lead-card" id="demo">
    <span className="eyebrow">HABLEMOS DE TU ACADEMIA</span>
    <h2>Descubre cómo encaja contigo.</h2>
    <p className="form-intro">Cuéntanos tu punto de partida y prepara tu demo de DuxBrain.</p>
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Tu nombre<input name="name" autoComplete="given-name" placeholder="Nombre" maxLength={100} required /></label>
        <label>Academia<input name="academy" autoComplete="organization" placeholder="Nombre de tu academia" maxLength={150} required /></label>
        <label className="full">Email profesional<input name="email" type="email" autoComplete="email" placeholder="tu@academia.es" maxLength={254} required /></label>
        <label>Teléfono<input name="phone" type="tel" autoComplete="tel" placeholder="+34 600 000 000" maxLength={30} required /></label>
        <label>Alumnos aprox.<select name="students" defaultValue="" required><option value="" disabled>Selecciona</option><option value="1-50">1–50</option><option value="51-200">51–200</option><option value="201-500">201–500</option><option value="501-1000">501–1.000</option><option value="1000+">Más de 1.000</option></select></label>
      </div>
      <input type="hidden" name="landing" value={landing} />
      <p className="privacy">SINDEVZ TECH, S.L. tratará tus datos para atender tu solicitud de información o demo. Consulta cómo ejercer tus derechos en la <a href={privacyUrl} target="_blank" rel="noreferrer">política de privacidad de DuxBrain</a>.</p>
      <button className="button button-primary form-button" type="submit">Solicitar mi demo <span aria-hidden="true">↗</span></button>
      <p className="form-notice">Vista previa: formulario pendiente de conexión. No se enviarán datos.</p>
      <p className="form-status" role="status" tabIndex={-1} ref={statusRef}>{message}</p>
    </form>
  </div>;
}
