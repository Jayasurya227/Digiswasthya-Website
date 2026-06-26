"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { ContactActions } from "@/components/features/ContactActions";
import { ContactForm } from "@/components/features/ContactForm";

export default function ContactUs() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <section className="bg-primary-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-primary-100 italic">&quot;Making healthcare services affordable and accessible for rural communities across India&quot;</p>
            </section>

            <div className="container py-20 px-4">
                {/* Prominent Contact Actions at the Top */}
                <div className="mb-16 bg-white p-8 lg:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Need Support?</h2>
                        <p className="text-gray-500 font-medium">Chat with us or call us directly for any healthcare queries.</p>
                    </div>
                    <ContactActions />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* General Support */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight border-l-4 border-primary-500 pl-4 uppercase">General Support</h3>
                        <div className="space-y-5 text-gray-600">
                            <div className="flex items-center gap-4 group">
                                <div className="bg-primary-50 p-3 rounded-full group-hover:bg-primary-100 transition-colors flex-shrink-0">
                                    <Mail className="h-5 w-5 text-primary-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Email Us</span>
                                    <span className="font-bold text-gray-900">info@digiswasthya.org</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="bg-primary-50 p-3 rounded-full group-hover:bg-primary-100 transition-colors flex-shrink-0">
                                    <Phone className="h-5 w-5 text-primary-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Call / WhatsApp</span>
                                    <span className="font-bold text-gray-900">+91 83184 24800</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="bg-primary-50 p-3 rounded-full group-hover:bg-primary-100 transition-colors flex-shrink-0">
                                    <MapPin className="h-5 w-5 text-primary-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Head Office</span>
                                    <span className="font-bold text-gray-900 text-sm leading-relaxed">Kali Road, Kathaicha Chauraha, Nath Nagar, Sant Kabir Nagar, Uttar Pradesh - 272176</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Find a centre near you → Our Network */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/network"
                            className="group block h-full bg-gradient-to-br from-primary-600 to-primary-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-primary-900/20 transition-all overflow-hidden relative"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                            <div className="relative">
                                <div className="bg-white/15 h-12 w-12 rounded-2xl flex items-center justify-center mb-5">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-2">Looking for a centre near you?</h3>
                                <p className="text-primary-100 leading-relaxed mb-6">
                                    We run a growing network of telemedicine centres across Uttar Pradesh, Bihar and Maharashtra. Find your nearest one with directions on the map.
                                </p>
                                <span className="inline-flex items-center gap-2 font-bold bg-white text-primary-700 px-5 py-2.5 rounded-xl group-hover:gap-3 transition-all">
                                    Explore Our Network <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                <div className="mt-20">
                    <ContactForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
