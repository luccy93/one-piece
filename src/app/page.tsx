import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TimelineSection from "@/components/TimelineSection";
import TransformationsSection from "@/components/TransformationsSection";
import CharacterStats from "@/components/CharacterStats";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <TransformationsSection />
      <CharacterStats />
      <GallerySection />
      <Footer />
    </main>
  );
}
