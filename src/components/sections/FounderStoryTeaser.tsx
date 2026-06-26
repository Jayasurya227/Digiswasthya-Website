"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FounderStoryTeaser() {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-white">
            <div className="container px-4">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative mx-auto lg:mx-0"
                    >
                        <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/images/sandeep-founder.jpg"
                                alt="Sandeep Kumar, Founder, DigiSwasthya Foundation"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white rounded-xl px-4 py-2 shadow-lg">
                            <Quote className="h-5 w-5" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                            <span className="h-px w-6 bg-primary-600" /> {t("founderTeaser.badge")}
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-5">
                            {t("founderTeaser.heading")}
                        </h2>
                        <div className="space-y-3 text-gray-600 leading-relaxed text-base">
                            <p>{t("founderTeaser.paragraph1")}</p>
                            <p>{t("founderTeaser.paragraph2")}</p>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-gray-900">
                            {t("founderTeaser.signature")}
                        </p>
                        <Link
                            href="/about-us#sandeeps-story"
                            className="inline-flex items-center gap-2 mt-6 text-primary-600 hover:text-primary-700 font-semibold text-sm border-b-2 border-primary-200 hover:border-primary-600 pb-1 transition-colors"
                        >
                            {t("founderTeaser.readMore")} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
