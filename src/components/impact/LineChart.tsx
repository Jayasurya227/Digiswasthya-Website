"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DataPoint {
    label: string;
    value: number;
}

interface LineChartProps {
    data: DataPoint[];
    title: string;
    color?: string; // hex color for line
    gradientColor?: string; // hex color for area fill
    valueSuffix?: string;
}

export function LineChart({
    data,
    title,
    color = "#1e7e42", // Default Primary 500
    gradientColor = "#d0e9d8", // Default Primary 100
    valueSuffix = ""
}: LineChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 260 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Watch container size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: 240 // Fixed height
                });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        
        // Setup ResizeObserver to capture size changes
        const resizeObserver = new ResizeObserver(() => handleResize());
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    const { width, height } = dimensions;
    const paddingLeft = 50;
    const paddingRight = 15;
    const paddingTop = 25;
    const paddingBottom = 35;

    const chartWidth = Math.max(width - paddingLeft - paddingRight, 0);
    const chartHeight = Math.max(height - paddingTop - paddingBottom, 0);

    // Calc Min and Max
    const values = data.map(d => d.value);
    const maxVal = Math.max(...values, 10);
    const maxY = Math.ceil(maxVal * 1.15); 
    const minY = 0;

    // Convert data to coordinates
    const points = data.map((d, i) => {
        const x = paddingLeft + (chartWidth > 0 ? (i / (data.length - 1)) * chartWidth : 0);
        const y = paddingTop + chartHeight - (maxY > 0 ? ((d.value - minY) / (maxY - minY)) * chartHeight : 0);
        return { x, y, label: d.label, value: d.value };
    });

    // Build SVG Path strings
    let pathD = "";
    if (points.length > 0) {
        pathD = points.reduce((acc, p, i) => {
            return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
        }, "");
    }

    // Build closed area path
    const areaD = pathD && points.length > 0
        ? `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
        : "";

    // Generate Y-axis grid lines (3 intervals for cleaner editorial feel)
    const yTicks = 3;
    const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minY + (i * (maxY - minY)) / yTicks);

    // Format utility
    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    const cleanId = title.replace(/[^a-zA-Z0-9]/g, "");

    return (
        <div 
            ref={containerRef} 
            className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative group/chart"
        >
            <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-6">
                {title}
            </h4>

            {width > 0 && (
                <div className="relative">
                    <svg width={width} height={height} className="overflow-visible select-none">
                        <defs>
                            {/* Area Gradient */}
                            <linearGradient id={`gradient-${cleanId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={gradientColor} stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        {/* Y-axis grid lines & labels */}
                        {yTickValues.map((val, i) => {
                            const y = paddingTop + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
                            return (
                                <g key={i} className="opacity-80">
                                    <line 
                                        x1={paddingLeft} 
                                        y1={y} 
                                        x2={width - paddingRight} 
                                        y2={y} 
                                        stroke="#f1f5f9" 
                                        strokeWidth={1}
                                    />
                                    <text 
                                        x={paddingLeft - 10} 
                                        y={y + 3.5} 
                                        textAnchor="end" 
                                        className="text-[9px] font-bold fill-gray-400 font-sans tracking-wide"
                                    >
                                        {formatNumber(val)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* X-axis labels */}
                        {points.map((p, i) => (
                            <text
                                key={i}
                                x={p.x}
                                y={paddingTop + chartHeight + 20}
                                textAnchor="middle"
                                className="text-[10px] font-bold fill-gray-400 font-sans"
                            >
                                {p.label}
                            </text>
                        ))}

                        {/* Area under the line */}
                        {areaD && (
                            <motion.path
                                d={areaD}
                                fill={`url(#gradient-${cleanId})`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        )}

                        {/* Line path */}
                        {pathD && (
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke={color}
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                            />
                        )}

                        {/* Interactive Dot Markers */}
                        {points.map((p, i) => {
                            const isHovered = hoveredIndex === i;
                            return (
                                <g key={i} className="cursor-pointer">
                                    {/* Hover interactive hit-target area */}
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r={18}
                                        fill="transparent"
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    />
                                    
                                    {/* Concentric glowing ring on hover */}
                                    {isHovered && (
                                        <circle
                                            cx={p.x}
                                            cy={p.y}
                                            r={9}
                                            fill={color}
                                            opacity={0.25}
                                            className="animate-pulse"
                                        />
                                    )}

                                    {/* Visible Center Dot */}
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r={isHovered ? 5.5 : 4}
                                        fill={isHovered ? "white" : color}
                                        stroke={isHovered ? color : "white"}
                                        strokeWidth={isHovered ? 2.5 : 1.5}
                                        className="transition-all duration-150"
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Tooltip Overlay */}
                    {hoveredIndex !== null && points[hoveredIndex] && (
                        <div
                            className="absolute bg-slate-950/95 text-white text-[10px] px-3 py-1.5 rounded-xl shadow-lg pointer-events-none z-10 -translate-x-1/2 -translate-y-full transition-all duration-150 border border-white/10"
                            style={{
                                left: `${points[hoveredIndex].x}px`,
                                top: `${points[hoveredIndex].y - 10}px`
                            }}
                        >
                            <span className="font-extrabold uppercase tracking-wider block text-gray-400 text-[8px]">
                                {points[hoveredIndex].label}
                            </span>
                            <span className="font-black text-white text-xs block mt-0.5 whitespace-nowrap">
                                {points[hoveredIndex].value.toLocaleString()} {valueSuffix}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
