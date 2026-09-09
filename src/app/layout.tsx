import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { hairSalonJsonLd } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://089barberia-profesional.vercel.app"),
  title: {
    default: "089 Barbería Profesional | Barbería en Montequinto",
    template: "%s | 089 Barbería Profesional"
  },
  description:
    "089 Barbería Profesional en Montequinto, Dos Hermanas, Sevilla. Corte de caballero, barba, productos profesionales y reserva mediante Booksy.",
  openGraph: {
    title: "089 Barbería Profesional",
    description:
      "Barbería profesional en Montequinto. Corte de caballero, barba y producto recomendado por 089.",
    siteName: "089 Barbería Profesional",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/home/hero.jpg", width: 680, height: 454 }]
  },
  icons: {
    icon: "/images/branding/logo-089-transparent.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonJsonLd()) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
