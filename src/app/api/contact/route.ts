import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { saveInquiry } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            phone,
            contactType,
            subject,
            message,
            location,
            assistanceNeeded,
            language,
        } = body;

        if (!name || !message || !(email || phone)) {
            return NextResponse.json(
                { error: "Name, message, and either an email or phone number are required." },
                { status: 400 }
            );
        }

        await saveInquiry({
            name,
            email: email || undefined,
            phone: phone || undefined,
            contactType: contactType || "General Inquiry",
            subject: subject || undefined,
            message,
            location: location || undefined,
            assistanceNeeded: assistanceNeeded || undefined,
            language: language || undefined,
        });

        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || "info@digiswasthya.org";

        const detailRows = [
            ["Contact Type", contactType || "General Inquiry"],
            ["Name", name],
            ["Email", email || "—"],
            ["Phone", phone || "—"],
            ["Subject", subject || "—"],
            ["Location", location || "—"],
            ["Assistance Needed", assistanceNeeded || "—"],
        ]
            .map(([label, value]) => `<tr><td style="padding:6px 12px;color:#666;font-weight:600;">${label}</td><td style="padding:6px 12px;">${value}</td></tr>`)
            .join("");

        try {
            await resend.emails.send({
                from: `Digiswasthya Website <${fromEmail}>`,
                to: [notifyEmail],
                subject: `New ${contactType || "General Inquiry"} from ${name}`,
                html: `
                <div style="font-family:sans-serif;color:#333;">
                    <h2 style="color:#1a6636;">New website inquiry</h2>
                    <table>${detailRows}</table>
                    <p style="margin-top:16px;"><strong>Message:</strong><br/>${message}</p>
                </div>
                `,
            });
        } catch (err) {
            console.error("[Contact API] Failed to send internal notification email:", err);
        }

        if (email) {
            try {
                await resend.emails.send({
                    from: `Digiswasthya Foundation <${fromEmail}>`,
                    to: [email],
                    subject: "Thank you for reaching out to DigiSwasthya",
                    html: `
                    <div style="font-family:sans-serif;color:#333;line-height:1.6;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to DigiSwasthya Foundation. Our team has received your message and will get back to you within 24-48 hours.</p>
                        <p>If your need is urgent, you can also reach us directly by phone or WhatsApp at +91 83184 24800.</p>
                        <p>Warm regards,<br/><strong>Sandeep Kumar</strong><br/>Founder, Digiswasthya Foundation</p>
                    </div>
                    `,
                });
            } catch (err) {
                console.error("[Contact API] Failed to send confirmation email:", err);
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error: any) {
        console.error("[Contact API Error]:", error);
        return NextResponse.json({ error: error.message || "Failed to submit inquiry" }, { status: 500 });
    }
}
