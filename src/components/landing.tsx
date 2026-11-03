import Link from "next/link";
import type { LandingContent } from "@/content/landings";
import { privacyUrl } from "@/lib/leads";
import { LeadForm } from "./lead-form";

export function Header({ name }: { name: string }) {
  return <header className="site-header container">
    <Link href="/" className="brand-text" aria-label="DuxBrain, inicio">DuxBrain<span className="brand-divider" /> <span className="product-name">{name}</span></Link>
    <a className="header-link" href="#demo"><span className="header-label-desktop">Hablemos de tu academia</span><span className="header-label-mobile">Demo</span><span className="header-arrow" aria-hidden="true">↗</span></a>
  </header>;
}

export function Hero({ content: c }: { content: LandingContent }) {
  return <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy"><div className="eyebrow"><span className="status-dot" />{c.eyebrow}</div>
      <h1 id="hero-title">{c.title}<br /><span>{c.accent}</span></h1>
      <p className="hero-description">{c.description}</p>
      <ul className="hero-points">{c.points.map(p => <li key={p}><span aria-hidden="true">✓</span>{p}</li>)}</ul>
      <div className="price"><strong>{c.price}</strong><span>por alumno activo / mes<small>Precio de referencia · Condiciones en la propuesta</small></span></div>
      {c.id === "campus-secure" && <p className="product-clarification">El mismo DuxBrain Campus. Mismo precio, con el foco en seguridad.</p>}
      <a className="button button-primary mobile-hero-cta" href="#demo">Quiero ver una demo <span aria-hidden="true">↗</span></a>
      <a className="text-link" href="#en-accion">Así puede encajar en tu academia <span aria-hidden="true">↓</span></a>
    </div>
    <LeadForm landing={c.id} />
  </section>;
}

export function Benefits({ content: c }: { content: LandingContent }) {
  return <section className="section container" id="beneficios"><div className="section-heading"><span className="eyebrow">PENSADO PARA TU ACADEMIA</span><h2>{c.benefitsTitle}</h2></div>
    <div className="benefit-grid">{c.benefits.map((b, i) => <article className="benefit-card" key={b.title}><span className="feature-number">0{i + 1}<span aria-hidden="true">↗</span></span><h3>{b.title}</h3><p>{b.text}</p></article>)}</div>
  </section>;
}

export function VisualDemo({ content: c }: { content: LandingContent }) {
  const secure = c.id === "campus-secure";
  return <section className="demo-section" id="en-accion"><div className="container demo-layout"><div className="demo-copy"><span className="eyebrow">EL APRENDIZAJE, CONECTADO</span><h2>{c.demoTitle}</h2><p>{c.demoText}</p><a className="text-link" href="#demo">Veámoslo con tu academia <span aria-hidden="true">↗</span></a></div>
    <figure className="demo-figure"><div className="product-window"><div className="window-top"><span className="window-dots" aria-hidden="true">● ● ●</span><span>Tu espacio de aprendizaje</span><span aria-hidden="true">▦</span></div>
      <div className="product-body"><aside className="mock-sidebar" aria-hidden="true"><span className="mock-square">A</span><span className="mock-nav active">▦</span><span className="mock-nav">▤</span><span className="mock-nav">◷</span></aside>
      <div className="mock-main"><div className="mock-kicker">MI ACADEMIA / CURSOS</div><h3>Un nuevo día para aprender.</h3><p className="mock-subtitle">Todo empieza con tu contenido.</p>
      <div className="course-preview"><div className="course-art" aria-hidden="true"><span>01</span><div className="orbit" /><span className="art-caption">EL CONOCIMIENTO<br />ABRE CAMINOS.</span></div><div className="course-bottom"><span>Tu curso · Tema 01</span><strong>Material de estudio</strong><span className="course-line" /></div></div>
      </div><div className="mock-panel"><span className="panel-tag">{secure ? "CONTROL DEL CAMPUS" : "IA SOBRE TU TEMARIO"}</span><h4>{secure ? "Tu contenido. Tus accesos." : "Aprender con contexto."}</h4>{secure ? <div className="control-list">{["Accesos", "Sesiones", "Reproducción"].map(x => <div key={x}><span>{x}</span><span aria-hidden="true">◉</span></div>)}</div> : <><div className="chat-question">¿Me ayudas a entender este tema?</div><div className="chat-answer"><span className="ai-mark" aria-hidden="true">✳</span><p>Podemos partir del material del curso y trabajar los conceptos paso a paso.</p></div><div className="mock-input">Tu siguiente pregunta… <span aria-hidden="true">↑</span></div></>}
      </div></div></div><figcaption>Demostración visual ilustrativa. No es una captura del producto. {secure && "El alcance de los controles se confirma en la demo."}</figcaption></figure>
  </div></section>;
}

export function Steps({ content: c }: { content: LandingContent }) {
  return <section className="section container steps-section"><div className="section-heading"><span className="eyebrow">DE TU IDEA A TU ACADEMIA</span><h2>Empezamos por conocerte.</h2></div><ol className="steps">{c.steps.map((s, i) => <li key={s}><span>0{i + 1}</span><p>{s}</p></li>)}</ol></section>;
}

export function FAQ({ content: c }: { content: LandingContent }) {
  return <section className="section container faq-section"><div><span className="eyebrow">ANTES DE DAR EL PASO</span><h2>Resolvemos<br />tus dudas.</h2><p>Y las que falten, las vemos contigo.</p></div><div className="faq-list">{c.faqs.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></section>;
}

export function FinalCTA({ name }: { name: string }) {
  return <section className="container final-wrap"><div className="final-cta"><div><span className="eyebrow">EL SIGUIENTE PASO ES TUYO</span><h2>Hablemos de lo que<br />necesita tu academia.</h2><p>Descubre DuxBrain {name} en una demo centrada en tu proyecto.</p></div><a className="button button-mint" href="#demo">Quiero ver una demo <span aria-hidden="true">↗</span></a></div></section>;
}

export function Footer() {
  return <footer className="container footer"><span className="brand-text">DuxBrain</span><p>Tecnología para quienes enseñan.</p><a href={privacyUrl} target="_blank" rel="noreferrer">Privacidad</a><span>© DuxBrain</span></footer>;
}

export function Landing({ content }: { content: LandingContent }) {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header name={content.name} /><main id="contenido"><Hero content={content} /><Benefits content={content} /><VisualDemo content={content} /><Steps content={content} /><FAQ content={content} /><FinalCTA name={content.id === "campus-secure" ? "Campus" : content.name} /></main><Footer /></>;
}
