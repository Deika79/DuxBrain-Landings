import Link from "next/link";
import Image from "next/image";
import type { LandingContent } from "@/content/landings";
import { privacyUrl } from "@/lib/leads";
import { LeadForm } from "./lead-form";

function BrandLogo() {
  return <span className="brand-logo"><Image src="/brand/DuxBrain-04.png" alt="DuxBrain" width={968} height={299} unoptimized /></span>;
}

export function Header({ name }: { name: string }) {
  return <header className="site-header container">
    <Link href="/" className="brand-text" aria-label="DuxBrain, inicio"><BrandLogo /><span className="brand-divider" /> <span className="product-name">{name}</span></Link>
    <a className="header-link" href="#demo" aria-label="Solicitar una demo"><span className="header-label-desktop">Solicitar una demo</span><span className="header-label-mobile">Demo</span><span className="header-arrow" aria-hidden="true">↗</span></a>
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
      <a className="button button-primary mobile-hero-cta" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a>
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

export function SectionNavigation({ content: c }: { content: LandingContent }) {
  return <nav className="container section-nav" aria-label={`Secciones de ${c.name}`}>
    <a href="#beneficios">{c.id === "campus-secure" ? "Avisos" : "Estudiar con IA"}</a>
    {c.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.navLabel}</a>)}
  </nav>;
}

export function FeatureSections({ content: c }: { content: LandingContent }) {
  return c.sections.map(section => <section className="section container feature-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
    <div className="section-heading"><span className="eyebrow">{section.eyebrow}</span><h2 id={`${section.id}-title`}>{section.title}</h2><p className="feature-description">{section.description}</p></div>
    <div className="feature-grid">{section.items.map(item => <article className="feature-item" key={item.title}><h3><span aria-hidden="true">↗</span>{item.title}</h3><p>{item.text}</p></article>)}</div>
  </section>);
}

export function VisualDemo({ content: c }: { content: LandingContent }) {
  return <section className="demo-section" id="en-accion"><div className="container demo-layout"><div className="demo-copy"><span className="eyebrow">{c.demo.panelLabel}</span><h2>{c.demoTitle}</h2><p>{c.demoText}</p><a className="text-link" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a></div>
    <figure className="demo-figure"><div className="illustration-label">Representación ilustrativa<span>No es una captura del producto</span></div><div className="product-window">
      <div className="product-body"><aside className="mock-sidebar" aria-hidden="true"><span className="mock-square">A</span><span className="mock-nav active">▦</span><span className="mock-nav">▤</span><span className="mock-nav">◷</span></aside>
      <div className="mock-main"><div className="mock-kicker">CAMPUS · EJEMPLO ILUSTRATIVO</div><h3>{c.demo.courseTitle}</h3><p className="mock-subtitle">{c.demo.subtitle}</p>
      <div className="course-preview"><div className="course-art" aria-hidden="true"><span>01</span><div className="orbit" /><span className="art-caption">MATERIAL<br />DE ESTUDIO</span></div><div className="course-bottom"><span>Contenido de ejemplo</span><strong>{c.demo.material}</strong><span className="course-line" /></div></div>
      </div><div className="mock-panel"><span className="panel-tag">{c.demo.panelLabel}</span><h4>{c.demo.panelTitle}</h4>{c.demo.reviewTopics ? <div className="control-list">{c.demo.reviewTopics.map(x => <div key={x}>{x}</div>)}</div> : <><div className="chat-question">{c.demo.question}</div><div className="chat-answer"><span className="ai-mark" aria-hidden="true">✳</span><p>{c.demo.answer}</p></div><div className="mock-input">Conversación de ejemplo</div></>}
      </div></div></div><figcaption>{c.demo.caption}</figcaption></figure>
  </div></section>;
}

export function FAQ({ content: c }: { content: LandingContent }) {
  return <section className="section container faq-section"><div><span className="eyebrow">ANTES DE DAR EL PASO</span><h2>Resolvemos<br />tus dudas.</h2><p>Y las que falten, las vemos contigo.</p></div><div className="faq-list">{c.faqs.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></section>;
}

export function FinalCTA({ content: c }: { content: LandingContent }) {
  return <section className="container final-wrap"><div className="final-cta"><div><span className="eyebrow">SOLICITA UNA DEMO</span><h2>{c.finalTitle}</h2><p>{c.finalText}</p></div><a className="button button-mint" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a></div></section>;
}

export function Footer() {
  return <footer className="container footer"><Link href="/" className="brand-text" aria-label="DuxBrain, inicio"><BrandLogo /></Link><p>Tecnología para quienes enseñan.</p><a href={privacyUrl} target="_blank" rel="noreferrer">Privacidad</a><span>© DuxBrain</span></footer>;
}

export function Landing({ content }: { content: LandingContent }) {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header name={content.name} /><main id="contenido"><Hero content={content} /><SectionNavigation content={content} /><Benefits content={content} /><VisualDemo content={content} /><FeatureSections content={content} /><FAQ content={content} /><FinalCTA content={content} /></main><Footer /></>;
}
