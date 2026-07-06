"use client";

import { motion } from "framer-motion";
import { KPICard } from "./KPICard";
import { impactData } from "@/data/impactData";

export function StatsGrid() {
    const kpiList = impactData.kpis;

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardItemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    };

    return (
        <section className="relative py-16 md:py-24 bg-slate-50/30 border-b border-slate-200/50 overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-8 lg:pb-12"
                >
                    {kpiList.map((kpi) => {
                        return (
                            <motion.div 
                                key={kpi.id} 
                                variants={cardItemVariants}
                                className="w-full"
                            >
                                <KPICard data={kpi} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
