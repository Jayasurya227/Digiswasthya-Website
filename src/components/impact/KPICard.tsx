"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import * as Icons from "lucide-react";
import { KPICardData } from "@/data/impactData";
import { useLanguage } from "@/context/LanguageContext";

interface KPICardProps {
    data: KPICardData;
}

export function KPICard({ data }: KPICardProps) {
    const { language } = useLanguage();
    const currentLang = (language === "en" || language === "hi") ? language : "en";
    const { value, suffix = "", label, icon, description } = data;

    // Dynamically get Lucide icon
    const iconName = icon as keyof typeof Icons;
    const LucideIcon = (iconName in Icons) ? (Icons[iconName] as Icons.LucideIcon) : Icons.HelpCircle;

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 90,
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <motion.div 
            ref={ref} 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative flex flex-col bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200/60 transition-all duration-300 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-5">
                {/* Custom Icon Container */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-primary-600 group-hover:bg-primary-50 group-hover:text-primary-700 transition-all duration-300">
                    <LucideIcon className="h-5.5 w-5.5 stroke-[1.8]" />
                </div>
            </div>
            
            <div className="mt-2 relative z-10">
                {/* Large animated number */}
                <span className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter flex items-baseline gap-0.5">
                    {displayValue.toLocaleString()}
                    {suffix && (
                        <span className="text-primary-600 font-extrabold text-2xl group-hover:scale-110 transition-transform inline-block">
                            {suffix}
                        </span>
                    )}
                </span>
                
                {/* Bold uppercase label */}
                <h3 className="text-xs font-black text-gray-900 mt-4 mb-2 uppercase tracking-widest leading-none">
                    {label[currentLang]}
                </h3>
                
                {/* Light description */}
                <p className="text-sm text-slate-500 font-light leading-relaxed tracking-wide opacity-90">
                    {description[currentLang]}
                </p>
            </div>
        </motion.div>
    );
}
