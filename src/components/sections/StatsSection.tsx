"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { StatsCounter } from "@/components/features/StatsCounter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_STATS = {
    patientsServed: 117644,
    totalConsultations: 97104,
    healthCamps: 2146,
    campsCHCPHC: 133,
    expertDoctors: 213,
    livesImpacted: 2850000,
};

type Stats = typeof DEFAULT_STATS;

export function StatsSection() {
    const [stats, setStats] = useState<Stats>(DEFAULT_STATS);

    useEffect(() => {
        async function fetchStats() {
            try {
                const ref = doc(db, "stats", "main");
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setStats(snap.data() as Stats);
                } else {
                    // First time: seed the database with default values
                    await setDoc(ref, DEFAULT_STATS);
                }
            } catch (err) {
                console.error("Failed to fetch stats:", err);
                // Fallback to default stats silently
            }
        }

        fetchStats();
    }, []);

    const { language } = useLanguage();
    const currentLang = (language === "en" || language === "hi") ? language : "en";

    return (
        <section className="py-16 bg-primary-900 text-white">
            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 xl:gap-6">
                    <div className="xl:col-span-6 mb-2">
                        <div className="inline-flex items-center gap-2 text-secondary-400 text-sm font-semibold uppercase tracking-widest mb-1">
                            <span className="h-px w-6 bg-secondary-400" /> Our Impact
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                            Strength in Numbers
                        </h2>
                    </div>
                    <StatsCounter value={stats.patientsServed} label="Patients Served" suffix="+" />
                    <StatsCounter value={stats.totalConsultations} label="Total Consultations" />
                    <StatsCounter value={stats.healthCamps} label="Health & Awareness Camps" />
                    <StatsCounter value={stats.campsCHCPHC} label="Health Camps at CHCs/PHCs" />
                    <StatsCounter value={stats.expertDoctors} label="Expert Doctors Onboard" />
                    <StatsCounter value={stats.livesImpacted} label="Lives Impacted" suffix="+" />

                    {/* Bridge CTA link to Our Impact page */}
                    <div className="xl:col-span-6 flex justify-center mt-10">
                        <Button asChild variant="secondary" className="gap-2 group">
                            <Link href="/our-impact">
                                {currentLang === "hi" 
                                    ? "विस्तृत विकास और पहुँच रिपोर्ट देखें" 
                                    : "Explore Growth & Reach Reports"}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
