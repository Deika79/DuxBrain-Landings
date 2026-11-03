import { Landing } from "@/components/landing";
import { landings } from "@/content/landings";
export const metadata = landings.campus.meta;
export default function CampusPage() { return <Landing content={landings.campus} />; }
