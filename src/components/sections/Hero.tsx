"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ContactActions } from "@/components/features/ContactActions";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const count = useSpring(0, { stiffness: 50, damping: 30 });
    const display = useTransform(count, (latest) => Math.floor(latest).toLocaleString() + suffix);

    useEffect(() => {
        count.set(value);
    }, [count, value]);

    return <motion.span>{display}</motion.span>;
}

export function Hero() {
    const { t } = useLanguage();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = next (right-to-left), -1 = prev (left-to-right)

    const images = [
        "/images/Hero Image 1.png",
        "/images/Hero_Image 3.png",
        "/images/Hero_image4.png",
        "/images/Hero_image 5.png"
    ];

    const stats = [
        { label: "Patients Served", value: 117644, suffix: "+" },
        { label: "Total Consultations", value: 97104, suffix: "" },
        { label: "Health & Awareness Camps", value: 2146, suffix: "" },
        { label: "Health Camps at CHCs/PHC", value: 133, suffix: "" },
        { label: "Expert Doctors Onboard", value: 213, suffix: "" },
        { label: "Lives Impacted", value: 2850000, suffix: "+" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentImageIndex, images.length]);

    const handleNext = () => {
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentImageIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const setCurrentIndex = (index: number) => {
        setCurrentImageIndex(index);
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? "100%" : "-100%",
            opacity: 0
        })
    };

    return (
        <section className="relative min-h-[740px] w-full flex items-center overflow-hidden bg-gray-900 group/hero pb-20">
            {/* Background Photo Slideshow with Sliding Animations */}
            <div className="absolute inset-0 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentImageIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.8 },
                            opacity: { duration: 0.6 }
                        }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${images[currentImageIndex]}')`,
                        }}
                    />
                </AnimatePresence>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
            </div>

            {/* Static Navigation Arrow Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-105"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-105"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Dot Indicators */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            currentImageIndex === index ? "bg-secondary-400 w-8" : "bg-white/40 hover:bg-white/70 w-3"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content — Left aligned */}
            <div className="relative z-10 container mx-auto px-6 py-24">
                <div className="max-w-2xl">

                    {/* Eyebrow label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 mb-5"
                    >
                        <span className="h-px w-8 bg-secondary-400" />
                        <span className="text-secondary-400 text-sm font-semibold uppercase tracking-widest">
                            DigiSwasthya Foundation
                        </span>
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6"
                    >
                        {t("hero.titlePart1")}{" "}
                        <span className="text-secondary-400">
                            {t("hero.titleHighlight")}
                        </span>{" "}
                        {t("hero.titlePart2")}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-base md:text-lg text-gray-200 font-normal mb-10 leading-relaxed max-w-xl"
                    >
                        {t("hero.subtitle")}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/donate"
                            className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white font-semibold text-base px-8 py-3.5 rounded-md transition-colors duration-200"
                        >
                            {t("nav.donate")}
                        </Link>
                        <Link
                            href="/network"
                            className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base px-8 py-3.5 rounded-md transition-colors duration-200"
                        >
                            {t("hero.bookConsultation")}
                        </Link>
                    </motion.div>

                    {/* Low-friction patient path: skip the page entirely, go straight to WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        className="mt-5"
                    >
                        <ContactActions variant="compact" />
                        <p className="text-gray-300 text-xs mt-2">{t("hero.chatNowLabel")}</p>
                    </motion.div>
                </div>
            </div>

            {/* Stats bar — anchored to bottom, clickable bridge link with pulsing indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm border-t border-white/10 transition-colors duration-300 group/stats"
            >
                <Link href="/our-impact" className="block cursor-pointer py-6 px-6 relative">
                    {/* Pulsing Highlight Badge centered on the top border */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary-500 text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md border border-secondary-400 flex items-center gap-1.5 group-hover/stats:bg-secondary-600 transition-colors duration-300">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        {t("nav.impact") ? `${t("nav.impact")} - Click to View Details` : "Click to view detailed charts"}
                    </div>

                    <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <div className="text-2xl md:text-3xl font-bold text-secondary-400 group-hover/stats:text-secondary-300 transition-colors">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-xs text-gray-300 uppercase tracking-wide mt-0.5">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                        
                        {/* Hover Hint Link */}
                        <div className="absolute right-0 bottom-[-14px] opacity-0 group-hover/stats:opacity-100 transition-opacity duration-300 text-[10px] font-bold text-secondary-400 tracking-widest hidden lg:block uppercase">
                            {t("nav.impact")} &rarr;
                        </div>
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}
