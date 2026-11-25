import type { Metadata } from "next";
import { BarbershopPreview } from "@/components/home/BarbershopPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero089 } from "@/components/home/Hero089";
import { Intro089 } from "@/components/home/Intro089";
import { MainNavigationCards } from "@/components/home/MainNavigationCards";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "089 Barbería Profesional | Montequinto",
    description: "Barbería y peluquería masculina en Montequinto. Consulta servicios, precios y reserva tu cita.",
    siteName: siteConfig.name,
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/interior/interior-main-frontal.webp", width: 1080, height: 721 }]
  }
};

export default function HomePage() {
  return (
    <main>
      <Intro089 />
      <Hero089 />
      <MainNavigationCards />
      <BarbershopPreview />
      <ContactSection />
      <ReviewsSection />
    </main>
  );
}
