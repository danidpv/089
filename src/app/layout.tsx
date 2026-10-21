import type { Metadata } from "next";
import { Archivo_Narrow, Manrope } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/data/site-config";
import { hairSalonJsonLd } from "@/lib/structured-data";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: "089 Barbería Profesional | Barbería en Montequinto",
    template: "%s | 089 Barbería Profesional"
  },
  description:
    "089 Barbería Profesional en Montequinto, Dos Hermanas. Corte de caballero, barba y servicios de peluquería masculina con reserva en Booksy.",
  openGraph: {
    title: "089 Barbería Profesional | Montequinto",
    description:
      "Barbería y peluquería masculina en Montequinto. Consulta servicios, precios y reserva tu cita.",
    siteName: "089 Barbería Profesional",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/barberia/interior-main-frontal.webp", width: 1080, height: 721 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "089 Barbería Profesional | Montequinto",
    description: "Barbería y peluquería masculina en Montequinto, Dos Hermanas.",
    images: ["/images/barberia/interior-main-frontal.webp"]
  },
  icons: {
    icon: "/images/branding/logo-089.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${archivoNarrow.variable}`}>
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
