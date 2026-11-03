import Link from "next/link";
import { landings } from "@/content/landings";
export default function Home() {
  return <main className="container review-page"><span className="brand-text">DuxBrain</span><div className="eyebrow">CAMPAÑAS · REVISIÓN LOCAL</div><h1>Tres enfoques.<br /><span>Una misma academia en el centro.</span></h1><p>Selecciona una landing para revisar su mensaje, diseño y formulario.</p><div className="review-grid">{Object.values(landings).map(c => <Link href={`/${c.id}`} key={c.id} className="review-card"><span className="eyebrow">/{c.id}</span><h2>{c.name}</h2><p>{c.description}</p><strong>{c.price} <small>/ alumno activo / mes</small></strong><span className="text-link">Ver landing ↗</span></Link>)}</div><p className="review-note">Campus y Campus Secure presentan el mismo producto y precio. Formularios pendientes de conexión.</p></main>;
}
