import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const bai = Bai_Jamjuree({
  variable: "--font-bai",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DuxBrain · Soluciones para academias",
  description: "IA sobre tu temario o un campus completo para tu academia. Descubre DuxBrain.",
  icons: { icon: { url: "/brand/DuxBrain2.png", type: "image/png", sizes: "350x350" }, apple: "/brand/DuxBrain2.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={bai.variable}
    >
      <body>{children}</body>
    </html>
  );
}
