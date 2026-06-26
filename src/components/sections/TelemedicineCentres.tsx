"use client";

import { MapPin, ExternalLink, Phone, MessageCircle, Stethoscope, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Centre = {
    name: string;
    code: string;
    district: string;
    state: string;
    pincode: string;
    mapLink?: string; // verified pin where available; otherwise a Maps search link is generated
};

// Authoritative list from the DigiSwasthya health-centres roster (health_centers.csv).
// Phone is common across all centres.
const CENTRE_PHONE = "+91 99879 44391";

const CENTRES: Centre[] = [
    // Uttar Pradesh
    { name: "Kathaicha", code: "DS-TMC-001", district: "Sant Kabir Nagar", state: "Uttar Pradesh", pincode: "272176", mapLink: "https://maps.app.goo.gl/4gydYNL5zncHEfbVA" },
    { name: "Asharafpur", code: "DS-TMC-003", district: "Sant Kabir Nagar", state: "Uttar Pradesh", pincode: "272162", mapLink: "https://maps.app.goo.gl/v4DK68qZuXnsaBpF9" },
    { name: "Itaunja", code: "DS-TMC-004", district: "Lucknow", state: "Uttar Pradesh", pincode: "226203" },
    // Bihar
    { name: "Sahebganj", code: "DS-TMC-002", district: "Muzaffarpur", state: "Bihar", pincode: "843125", mapLink: "https://maps.app.goo.gl/d8C46korjVmwhAE6A" },
    // Maharashtra — Nagpur
    { name: "Gorewada", code: "DS-TMC-005", district: "Nagpur", state: "Maharashtra", pincode: "440013" },
    { name: "Jagnath Budhwari", code: "DS-TMC-006", district: "Nagpur", state: "Maharashtra", pincode: "440002" },
    { name: "Indira Gandhi Rugnalaya (IGR)", code: "DS-TMC-007", district: "Nagpur", state: "Maharashtra", pincode: "440033" },
    { name: "Chinchbhavan", code: "DS-TMC-008", district: "Nagpur", state: "Maharashtra", pincode: "440037" },
    { name: "Narsala", code: "DS-TMC-009", district: "Nagpur", state: "Maharashtra", pincode: "440034" },
    { name: "Hasanbagh", code: "DS-TMC-010", district: "Nagpur", state: "Maharashtra", pincode: "440024" },
    { name: "Chakole", code: "DS-TMC-011", district: "Nagpur", state: "Maharashtra", pincode: "440008" },
    { name: "Bharatwada, Vijay Nagar", code: "DS-TMC-012", district: "Nagpur", state: "Maharashtra", pincode: "440035" },
    // Maharashtra — Pune
    { name: "Peth", code: "DS-TMC-013", district: "Pune", state: "Maharashtra", pincode: "410512" },
    { name: "Rajgurunagar", code: "DS-TMC-014", district: "Pune", state: "Maharashtra", pincode: "410505" },
    { name: "Karanjawane", code: "DS-TMC-015", district: "Pune", state: "Maharashtra", pincode: "412209" },
    // Maharashtra — other districts
    { name: "Khodala, Mokhada", code: "TMC-DSF0018", district: "Palghar", state: "Maharashtra", pincode: "401604" },
    { name: "Borgaon", code: "TMC-00-DS19", district: "Nashik", state: "Maharashtra", pincode: "422211" },
    { name: "Khalapur", code: "TMC-0020", district: "Raigad", state: "Maharashtra", pincode: "410202" },
];

// State display order: rooted in UP, then Bihar, then the Maharashtra cluster.
const STATE_ORDER = ["Uttar Pradesh", "Bihar", "Maharashtra"];

function mapHref(centre: Centre): string {
    if (centre.mapLink) return centre.mapLink;
    const query = `DigiSwasthya Telemedicine Centre ${centre.name}, ${centre.district}, ${centre.state} ${centre.pincode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const JOURNEY_STEPS = [
    { icon: MessageCircle, key: "step1" },
    { icon: MapPin, key: "step2" },
    { icon: Stethoscope, key: "step3" },
    { icon: ClipboardCheck, key: "step4" },
];

export function TelemedicineCentres() {
    const { t } = useLanguage();

    const grouped = STATE_ORDER.map((state) => ({
        state,
        centres: CENTRES.filter((c) => c.state === state),
    })).filter((g) => g.centres.length > 0);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                        <span className="h-px w-6 bg-primary-600" /> {t("centres.badge")}
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                        {t("centres.headingPart1")} <span className="text-primary-600">DigiSwasthya</span> {t("centres.headingPart2")}
                    </h2>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                        {t("centres.subheading")}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-primary-700">
                        {CENTRES.length} {t("centres.countSuffix")}
                    </p>
                </div>

                {/* How It Works — patient journey, so addresses below aren't just a wall of text */}
                <div className="mb-16">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-8">
                        {t("centres.howItWorksTitle")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
                        {JOURNEY_STEPS.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.key} className="relative flex flex-col items-start">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center justify-center h-11 w-11 rounded-full bg-primary-600 text-white font-serif font-bold shrink-0">
                                            {i + 1}
                                        </div>
                                        <Icon className="h-5 w-5 text-primary-600 hidden sm:block" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-1.5">
                                        {t(`centres.${step.key}Title`)}
                                    </h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {t(`centres.${step.key}Desc`)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Centres grouped by state */}
                <div className="space-y-12">
                    {grouped.map((group) => (
                        <div key={group.state}>
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">{group.state}</h3>
                                <span className="text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-100 rounded-full px-2.5 py-0.5">
                                    {group.centres.length}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.centres.map((centre) => (
                                    <div
                                        key={centre.code}
                                        className="bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 p-7 rounded-xl flex flex-col"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                                    {centre.code}
                                                </span>
                                                <h4 className="text-lg font-semibold text-gray-900 mt-1">
                                                    {centre.name}
                                                </h4>
                                            </div>
                                            <span className="flex h-2 w-2 mt-2 flex-shrink-0">
                                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                        </div>

                                        <div className="space-y-2.5 mb-6 flex-grow">
                                            <div className="flex items-start gap-2.5">
                                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-500 text-sm leading-relaxed">
                                                    {centre.district}, {centre.state} &ndash; {centre.pincode}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                <a href={`tel:${CENTRE_PHONE.replace(/\s/g, "")}`} className="text-sm text-gray-500 hover:text-primary-600">{CENTRE_PHONE}</a>
                                            </div>
                                        </div>

                                        <a
                                            href={mapHref(centre)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-semibold border-t border-gray-100 pt-4 transition-colors"
                                        >
                                            {t("centres.viewOnMap")} <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
