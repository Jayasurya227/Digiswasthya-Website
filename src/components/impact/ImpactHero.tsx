"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { impactData } from "@/data/impactData";

export function ImpactHero() {
    const { language } = useLanguage();
    const currentLang = (language === "en" || language === "hi") ? language : "en";
    const heroContent = impactData.hero;

    return (
        <section className="relative bg-slate-50/50 border-b border-slate-200/50 py-16 lg:py-24 overflow-hidden">
            <div className="container max-w-4xl relative z-10 text-center space-y-6 px-4">
                {/* Decorative Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary-800 text-[10px] font-extrabold uppercase tracking-widest shadow-sm border border-slate-200"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                    {heroContent.badge[currentLang]}
                </motion.div>
                
                {/* Unified Editorial Typography Header */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-tight"
                >
                    {currentLang === "en" ? (
                        <>
                            Our Measurable <span className="text-primary-600">Healthcare Impact</span>
                        </>
                    ) : (
                        <>
                            हमारा मापने योग्य <span className="text-primary-600">स्वास्थ्य प्रभाव</span>
                        </>
                    )}
                </motion.h1>

                {/* Subtitle with compact spacing */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
                    className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg font-light leading-relaxed tracking-wide font-sans"
                >
                    {heroContent.subtitle[currentLang]}
                </motion.p>
            </div>
        </section>
    );
}
