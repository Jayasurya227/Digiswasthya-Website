"use client";

import { motion } from "framer-motion";

interface BarItem {
    label: string;
    value: number;
}

interface BarChartProps {
    data: BarItem[];
    title: string;
    barColor?: string; // hex gradient or Tailwind colors
    barGradientFrom?: string;
    barGradientTo?: string;
}

export function BarChart({ 
    data, 
    title, 
    barGradientFrom = "from-secondary-400",
    barGradientTo = "to-secondary-600"
}: BarChartProps) {
    const maxVal = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="w-full bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">
                    {title}
                </h4>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => {
                    const percentage = (item.value / maxVal) * 100;

                    return (
                        <div key={index} className="space-y-2 group/bar">
                            <div className="flex justify-between text-xs font-bold font-sans">
                                <span className="text-gray-700 transition-colors tracking-wide">
                                    {item.label}
                                </span>
                                <span className="text-gray-950 font-black">
                                    {item.value.toLocaleString()}
                                </span>
                            </div>
                            
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                                    className={`h-full rounded-full bg-gradient-to-r ${barGradientFrom} ${barGradientTo}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
