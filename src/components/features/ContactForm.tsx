"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactActions } from "./ContactActions";
import { useLanguage } from "@/context/LanguageContext";

type ContactType = "General Inquiry" | "Donor" | "Volunteer" | "Patient / Need Help";

interface FormData {
    name: string;
    email?: string;
    phone?: string;
    subject?: string;
    message: string;
    contactType: ContactType;
    location?: string;
    assistanceNeeded?: string;
    consent: boolean;
}

const VOLUNTEER_FORM_URL = "https://forms.gle/GvjUfAoMBKvqTNcXA";

export function ContactForm() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const { register, handleSubmit, watch, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({
        defaultValues: {
            contactType: "General Inquiry"
        }
    });

    const contactType = watch("contactType");
    const isPatient = contactType === "Patient / Need Help";
    const isVolunteer = contactType === "Volunteer";

    const onSubmit = async (data: FormData) => {
        setSubmitError(false);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Request failed");
            setSubmitted(true);
        } catch (err) {
            console.error("Contact form submission failed:", err);
            setSubmitError(true);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-2xl shadow-xl border border-primary-100 text-center space-y-6"
            >
                <div className="flex justify-center">
                    <div className="bg-primary-50 p-4 rounded-full">
                        <CheckCircle2 className="h-16 w-16 text-primary-600" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{t("contactForm.successTitle")}</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    {t("contactForm.successBody")}
                </p>
                <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                >
                    {t("contactForm.sendAnother")}
                </Button>
            </motion.div>
        );
    }

    return (
        <section className="py-20 bg-gray-100/80" id="message-form">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-8 lg:p-12">
                        <div className="mb-10 border-b border-gray-100 pb-8 text-center">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{t("contactForm.heading")}</h3>
                            <p className="text-gray-500 font-medium">{t("contactForm.subheading")}</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">{t("contactForm.contactingAs")}</label>
                                <select
                                    {...register("contactType")}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium focus:ring-2 focus:ring-primary-500 transition-all outline-none appearance-none bg-white shadow-sm"
                                >
                                    <option value="General Inquiry">{t("contactForm.typeGeneral")}</option>
                                    <option value="Donor">{t("contactForm.typeDonor")}</option>
                                    <option value="Volunteer">{t("contactForm.typeVolunteer")}</option>
                                    <option value="Patient / Need Help">{t("contactForm.typePatient")}</option>
                                </select>
                            </div>

                            <AnimatePresence>
                                {isPatient && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-primary-50 border border-primary-100 rounded-xl p-5 mb-6">
                                            <p className="text-sm font-semibold text-primary-900 mb-3">{t("contactForm.patientHelpNote")}</p>
                                            <ContactActions />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-900">{t("contactForm.fullName")}</label>
                                    <input
                                        {...register("name", { required: t("contactForm.nameRequired") })}
                                        placeholder={t("contactForm.namePlaceholder")}
                                        className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white font-medium"
                                    />
                                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-900">{t("contactForm.email")}</label>
                                    <input
                                        {...register("email", {
                                            validate: (value) => {
                                                const phone = getValues("phone");
                                                if (!value && !phone) return t("contactForm.emailOrPhoneRequired");
                                                if (value && !/^\S+@\S+$/i.test(value)) return t("contactForm.emailInvalid");
                                                return true;
                                            }
                                        })}
                                        type="email"
                                        placeholder={t("contactForm.emailPlaceholder")}
                                        className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white font-medium"
                                    />
                                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">
                                    {t("contactForm.phone")} <span className="text-gray-400 font-normal">{t("contactForm.phoneOptionalUnlessNoEmail")}</span>
                                </label>
                                <input
                                    {...register("phone", {
                                        validate: (value) => {
                                            const email = getValues("email");
                                            if (!value && !email) return t("contactForm.emailOrPhoneRequired");
                                            return true;
                                        }
                                    })}
                                    placeholder={t("contactForm.phonePlaceholder")}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white font-medium"
                                />
                                {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                            </div>

                            {isPatient && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-900">{t("contactForm.locationLabel")}</label>
                                        <input
                                            {...register("location")}
                                            placeholder={t("contactForm.locationPlaceholder")}
                                            className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-900">{t("contactForm.assistanceLabel")}</label>
                                        <input
                                            {...register("assistanceNeeded")}
                                            placeholder={t("contactForm.assistancePlaceholder")}
                                            className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">{t("contactForm.subject")}</label>
                                <input
                                    {...register("subject")}
                                    placeholder={t("contactForm.subjectPlaceholder")}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">{t("contactForm.message")}</label>
                                <textarea
                                    {...register("message", { required: t("contactForm.messageRequired") })}
                                    placeholder={t("contactForm.messagePlaceholder")}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none bg-white font-medium shadow-sm"
                                />
                                {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>}
                            </div>

                            {isVolunteer && (
                                <p className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg p-3">
                                    {t("contactForm.volunteerNote")}{" "}
                                    <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-semibold hover:underline">
                                        {t("contactForm.volunteerNoteLink")}
                                    </a>
                                    {t("contactForm.volunteerNoteEnd")}
                                </p>
                            )}

                            <div className="flex items-start gap-2">
                                <input
                                    {...register("consent", { required: true })}
                                    type="checkbox"
                                    id="consent-form"
                                    className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="consent-form" className="text-xs text-gray-900 font-medium">
                                    {t("contactForm.consent")}
                                </label>
                            </div>

                            {submitError && (
                                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl p-4">
                                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-red-700">{t("contactForm.errorTitle")}</p>
                                        <p className="text-xs text-red-600 mt-0.5">{t("contactForm.errorBody")}</p>
                                    </div>
                                </div>
                            )}

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <Button
                                    disabled={isSubmitting}
                                    className="w-full py-6 text-lg rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex gap-2 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white"
                                    type="submit"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            {t("contactForm.submit")}
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
