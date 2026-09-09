import { BarbershopPreview } from "@/components/home/BarbershopPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero089 } from "@/components/home/Hero089";
import { Intro089 } from "@/components/home/Intro089";
import { MainNavigationCards } from "@/components/home/MainNavigationCards";
import { ReviewsSection } from "@/components/home/ReviewsSection";

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
