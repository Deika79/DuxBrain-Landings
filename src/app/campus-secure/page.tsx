import { Landing } from "@/components/landing";
import { landings } from "@/content/landings";
export const metadata = landings["campus-secure"].meta;
export default function CampusSecurePage() { return <Landing content={landings["campus-secure"]} />; }
