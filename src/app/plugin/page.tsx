import { Landing } from "@/components/landing";
import { landings } from "@/content/landings";
export const metadata = landings.plugin.meta;
export default function PluginPage() { return <Landing content={landings.plugin} />; }
