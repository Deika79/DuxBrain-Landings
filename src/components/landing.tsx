import Link from "next/link";
import Image from "next/image";
import type { LandingContent } from "@/content/landings";
import { primaryScreenshots, sectionScreenshots, type ProductScreenshot } from "@/content/product-images";
import { privacyUrl } from "@/lib/leads";
import { LeadForm } from "./lead-form";

function BrandLogo() {
  return <span className="brand-logo"><Image src="/brand/DuxBrain-04.png" alt="DuxBrain" width={968} height={299} unoptimized /></span>;
}

export function Header({ name }: { name: string }) {
  return <div className="header-band"><header className="site-header container">
    <Link href="/" className="brand-text" aria-label="DuxBrain, inicio"><BrandLogo /><span className="brand-divider" /> <span className="product-name">{name}</span></Link>
    <a className="header-link" href="#demo" aria-label="Solicitar una demo"><span className="header-label-desktop">Solicitar una demo</span><span className="header-label-mobile">Demo</span><span className="header-arrow" aria-hidden="true">↗</span></a>
  </header></div>;
}

export function Hero({ content: c }: { content: LandingContent }) {
  return <section className="hero-band" aria-labelledby="hero-title"><div className="hero container">
    <div className="hero-copy"><div className="eyebrow"><span className="status-dot" />{c.eyebrow}</div>
      <h1 id="hero-title">{c.title}<br /><span>{c.accent}</span></h1>
      <p className="hero-description">{c.description}</p>
      <a className="button button-primary mobile-hero-cta" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a>
      <ul className="hero-points">{c.points.map(p => <li key={p}><span aria-hidden="true">✓</span>{p}</li>)}</ul>
      <div className="price"><strong>{c.price}</strong><span>por alumno activo / mes<small>Precio de referencia · Condiciones en la propuesta</small></span></div>
      {c.id === "campus-secure" && <p className="product-clarification">El mismo DuxBrain Campus. Mismo precio, con el foco en seguridad.</p>}
      <a className="text-link" href="#en-accion">Así puede encajar en tu academia <span aria-hidden="true">↓</span></a>
    </div>
    <LeadForm landing={c.id} />
  </div></section>;
}

export function Benefits({ content: c }: { content: LandingContent }) {
  return <section className="section benefit-section" id="beneficios"><div className="container"><div className="section-heading"><span className="eyebrow">PENSADO PARA TU ACADEMIA</span><h2>{c.benefitsTitle}</h2></div>
    <div className="benefit-grid">{c.benefits.map((b, i) => <article className="benefit-card" key={b.title}><span className="feature-number">0{i + 1}<span aria-hidden="true">↗</span></span><h3>{b.title}</h3><p>{b.text}</p></article>)}</div>
  </div></section>;
}

export function SectionNavigation({ content: c }: { content: LandingContent }) {
  return <div className="navigation-band"><nav className="container section-nav" aria-label={`Secciones de ${c.name}`}>
    <a href="#beneficios">{c.id === "campus-secure" ? "Avisos" : "Estudiar con IA"}</a>
    {c.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.navLabel}</a>)}
  </nav></div>;
}

export function FeatureSections({ content: c }: { content: LandingContent }) {
  const tones: Record<string, string> = {
    herramientas: "paper", progreso: "mist", integracion: "night", descargas: "mint",
    "clases-video": "paper", "matriculas-cobros": "night", comunicacion: "mist", "seguridad-mcp": "mint",
    "configuracion-avisos": "paper", "video-descargas": "mist", "campus-completo": "night", mcp: "mint",
  };
  return c.sections.map(section => <section className={`section feature-section band-${tones[section.id] ?? "paper"}`} id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><div className="container feature-layout">
    <div className="section-heading"><span className="eyebrow">{section.eyebrow}</span><h2 id={`${section.id}-title`}>{section.title}</h2><p className="feature-description">{section.description}</p></div>
    <div className="feature-grid">{section.items.map(item => <article className="feature-item" key={item.title}><h3><span aria-hidden="true">↗</span>{item.title}</h3><p>{item.text}</p></article>)}</div>
    {sectionScreenshots[`${c.id}/${section.id}`] && <div className="section-capture"><ProductCapture screenshot={sectionScreenshots[`${c.id}/${section.id}`]} /></div>}
  </div></section>);
}

function ProductCapture({ screenshot }: { screenshot: ProductScreenshot }) {
  return <figure className="product-capture">
    <a className="capture-link" href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir captura completa en otra pestaña: ${screenshot.alt}`}>
      <div className="capture-frame"><Image src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 1103px) calc(100vw - 64px), 1040px" /></div>
      <span className="capture-open">Abrir captura completa <span aria-hidden="true">↗</span></span>
    </a>
    <figcaption>{screenshot.caption}</figcaption>
  </figure>;
}

export function VisualDemo({ content: c }: { content: LandingContent }) {
  return <section className="demo-section" id="en-accion"><div className="container demo-layout"><div className="demo-copy"><span className="eyebrow">{c.demo.panelLabel}</span><h2>{c.demoTitle}</h2><p>{c.demoText}</p><a className="text-link" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a></div>
    <div className="demo-figure"><ProductCapture screenshot={primaryScreenshots[c.id]} /></div>
  </div></section>;
}

export function FAQ({ content: c }: { content: LandingContent }) {
  return <section className="section faq-band"><div className="container faq-section"><div><span className="eyebrow">ANTES DE DAR EL PASO</span><h2>Resolvemos<br />tus dudas.</h2><p>Y las que falten, las vemos contigo.</p></div><div className="faq-list">{c.faqs.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></div></section>;
}

export function FinalCTA({ content: c }: { content: LandingContent }) {
  return <section className="final-wrap"><div className="container final-cta"><div><span className="eyebrow">SOLICITA UNA DEMO</span><h2>{c.finalTitle}</h2><p>{c.finalText}</p></div><a className="button button-mint" href="#demo">Solicitar una demo <span aria-hidden="true">↗</span></a></div></section>;
}

export function Footer() {
  return <div className="footer-band"><footer className="container footer"><Link href="/" className="brand-text" aria-label="DuxBrain, inicio"><BrandLogo /></Link><p>Tecnología para quienes enseñan.</p><a href={privacyUrl} target="_blank" rel="noreferrer">Privacidad</a><span>© DuxBrain</span></footer></div>;
}

export function Landing({ content }: { content: LandingContent }) {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header name={content.name} /><main id="contenido"><Hero content={content} /><SectionNavigation content={content} /><Benefits content={content} /><VisualDemo content={content} /><FeatureSections content={content} /><FAQ content={content} /><FinalCTA content={content} /></main><Footer /></>;
}
