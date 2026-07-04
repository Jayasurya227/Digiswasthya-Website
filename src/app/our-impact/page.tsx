"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImpactHero } from "@/components/impact/ImpactHero";
import { StatsGrid } from "@/components/impact/StatsGrid";
import { GrowthTrends } from "@/components/impact/GrowthTrends";
import { ImpactDistribution } from "@/components/impact/ImpactDistribution";
import { ImpactTimeline } from "@/components/impact/ImpactTimeline";
import { InteractiveReachMap } from "@/components/impact/InteractiveReachMap";

export default function OurImpact() {
    return (
        <main className="min-h-screen bg-[#f8faf9] flex flex-col justify-between">
            <div>
                <Navbar />
                
                {/* Step 1: Impact Hero & KPI Cards */}
                <ImpactHero />
                <StatsGrid />

                {/* Step 2: Growth Trends */}
                <GrowthTrends />

                {/* Geographical Footprint Map */}
                <InteractiveReachMap />

                {/* Step 3: Impact Distribution */}
                <ImpactDistribution />

                {/* Step 4: Our Journey */}
                <ImpactTimeline />
            </div>
            
            <Footer />
        </main>
    );
}
