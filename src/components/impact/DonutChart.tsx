"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DonutItem {
    label: string;
    value: number; // percentage (0 - 100)
    color: string;
}

interface DonutChartProps {
    data: DonutItem[];
    title: string;
}

export function DonutChart({ data, title }: DonutChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Circle properties
    const radius = 65;
    const strokeWidth = 20;
    const center = 100;
    const circumference = 2 * Math.PI * radius; // ~408.4

    // Calculate cumulative offsets purely (satisfying React compiler)
    const slices = data.map((item, index) => {
        const previousSum = data.slice(0, index).reduce((sum, d) => sum + d.value, 0);
        const percent = item.value / 100;
        const strokeLength = percent * circumference;
        const strokeOffset = circumference - ((previousSum / 100) * circumference);

        return {
            ...item,
            strokeLength,
            strokeOffset,
            index
        };
    });

    return (
        <div className="w-full bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
            {/* Chart SVG */}
            <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                <svg 
                    width="200" 
                    height="200" 
                    viewBox="0 0 200 200" 
                    className="transform -rotate-90 select-none overflow-visible"
                >
                    {/* Background track circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth={strokeWidth}
                    />

                    {/* Slices */}
                    {slices.map((slice) => {
                        const isActive = activeIndex === slice.index;
                        return (
                            <motion.circle
                                key={slice.index}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={slice.color}
                                strokeWidth={isActive ? strokeWidth + 3 : strokeWidth}
                                strokeDasharray={`${slice.strokeLength} ${circumference}`}
                                strokeDashoffset={slice.strokeOffset}
                                strokeLinecap="butt"
                                initial={{ strokeDasharray: `0 ${circumference}` }}
                                whileInView={{ strokeDasharray: `${slice.strokeLength} ${circumference}` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: slice.index * 0.05 }}
                                className="cursor-pointer transition-all duration-200 origin-center"
                                onMouseEnter={() => setActiveIndex(slice.index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            />
                        );
                    })}
                </svg>

                {/* Inner center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    {activeIndex !== null && slices[activeIndex] ? (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-3xl font-black text-gray-900 leading-none tracking-tighter">
                                {slices[activeIndex].value}%
                            </span>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 px-4 truncate max-w-[130px]">
                                {slices[activeIndex].label.split(" ")[0]}
                            </span>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                                Cases
                            </span>
                            <span className="text-2xl font-black text-gray-900 mt-1 leading-none tracking-tight">
                                100%
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Legend Details */}
            <div className="flex-1 w-full space-y-2">
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4">
                    {title}
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                    {slices.map((slice) => {
                        const isActive = activeIndex === slice.index;
                        return (
                            <div 
                                key={slice.index} 
                                className={`flex items-center justify-between p-2 rounded-xl transition-all duration-200 border border-transparent cursor-pointer ${
                                    isActive 
                                    ? "bg-slate-50 border-slate-200/60 shadow-sm font-semibold" 
                                    : "opacity-85 hover:opacity-100 hover:bg-slate-50/50"
                                }`}
                                onMouseEnter={() => setActiveIndex(slice.index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="flex items-center gap-3 truncate mr-2">
                                    <span 
                                        className="h-2.5 w-2.5 rounded-full shrink-0 shadow-sm" 
                                        style={{ backgroundColor: slice.color }} 
                                    />
                                    <span className="text-xs text-gray-700 truncate font-sans tracking-wide">
                                        {slice.label}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-gray-950 shrink-0 font-sans">
                                    {slice.value}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
