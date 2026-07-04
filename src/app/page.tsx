"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FounderStoryTeaser } from "@/components/sections/FounderStoryTeaser";
import { BeneficiaryStories } from "@/components/sections/BeneficiaryStories";
import { Collaboration } from "@/components/sections/Collaboration";
import { AwardSection } from "@/components/sections/AwardSection";
import { VideoHighlight } from "@/components/sections/VideoHighlight";
import { ImpactTeaser } from "@/components/sections/ImpactTeaser";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f4f7f5]">
      <Navbar />
      <Hero />
      <FounderStoryTeaser />
      <Services />
      <BeneficiaryStories />
      <ImpactTeaser />
      <AwardSection />
      <VideoHighlight />
      <Collaboration />

      {/* Social Media Follow Section */}
      <section className="py-12 bg-[#fdf8f3] border-t border-[#e8ddd0]">
        <div className="container text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t("social.followTitle")}</h3>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/DigiSwasthya/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Facebook</a>
            <a href="https://x.com/DigiSwasthya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Twitter</a>
            <a href="https://www.instagram.com/digiswasthya/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Instagram</a>
            <a href="https://www.linkedin.com/company/digiswasthya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">LinkedIn</a>
            <a href="https://www.youtube.com/channel/UC52n8c8U4jAtHsIzq7-wKvQ" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">YouTube</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
