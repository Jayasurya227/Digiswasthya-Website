"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { impactData } from "@/data/impactData";
import { LineChart } from "./LineChart";

export function GrowthTrends() {
    const { language } = useLanguage();
    const currentLang = (language === "en" || language === "hi") ? language : "en";
    const trends = impactData.growthTrends;

    // Localized translations for section titles
    const titleTranslations = {
        en: "Growth Over the Years",
        hi: "वर्षों के दौरान विकास"
    };

    const subtitleTranslations = {
        en: "Our growth trends from 2020 to 2025 demonstrate the accelerating demand and reach of our digital healthcare model in rural communities.",
        hi: "2020 से 2025 तक के हमारे विकास के रुझान ग्रामीण समुदायों में हमारे डिजिटल स्वास्थ्य सेवा मॉडल की बढ़ती मांग और पहुंच को प्रदर्शित करते हैं।"
    };

    const chartsConfig = [
        {
            title: { en: "Patients Served Growth", hi: "मरीजों की सेवा में वृद्धि" },
            data: trends.map(d => ({ label: d.year, value: d.patients })),
            color: "#1e7e42", // Primary Green
            gradientColor: "#d0e9d8",
            suffix: "+"
        },
        {
            title: { en: "Health Camps Growth", hi: "स्वास्थ्य शिविरों में वृद्धि" },
            data: trends.map(d => ({ label: d.year, value: d.camps })),
            color: "#d97706", // Secondary Amber
            gradientColor: "#fef3c7",
            suffix: ""
        },
        {
            title: { en: "Doctors Onboard Growth", hi: "संबंधित डॉक्टरों में वृद्धि" },
            data: trends.map(d => ({ label: d.year, value: d.doctors })),
            color: "#0f3a1f", // Primary Dark Green
            gradientColor: "#eef6f0",
            suffix: ""
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 text-secondary-500 text-xs font-bold uppercase tracking-widest">
                        <span className="h-px w-6 bg-secondary-400" />
                        {currentLang === "en" ? "Historical Data" : "ऐतिहासिक डेटा"}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                        {titleTranslations[currentLang]}
                    </h2>
                    
                    <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
                        {subtitleTranslations[currentLang]}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {chartsConfig.map((config, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <LineChart
                                data={config.data}
                                title={config.title[currentLang]}
                                color={config.color}
                                gradientColor={config.gradientColor}
                                valueSuffix={config.suffix}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
