import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

export async function POST(req) {
    const { name, email, message } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
        console.error("Missing input fields:", { name, email, message });
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.error("Invalid email format:", email);
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate environment variables
    if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS || !process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
        console.error("Missing environment variables");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Initialize MySQL connection
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Insert contact data into contact table
        await connection.execute(
            "INSERT INTO contact (name, email, message, submitted_at) VALUES (?, ?, ?, NOW())",
            [name, email, message]
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to save message to database" }, { status: 500 });
    } finally {
        if (connection) await connection.end();
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.CONTACT_EMAIL_USER,
            pass: process.env.CONTACT_EMAIL_PASS,
        },
    });

    // User confirmation email template
    const userEmailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Tourism Co!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="background-color: #f4f4f4; width: 100%; height: 20px;"></div>
            <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                    <td style="padding: 20px;">
                        <h1 style="font-size: 24px; color: #333333; margin: 0 0 20px;">Thank You for Contacting Tourism Co!</h1>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            Hi ${name},<br/>
                            Thank you for reaching out. We’ve received your message and our team will respond within 24 hours to assist with your travel inquiries.
                        </p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            In the meantime, explore our travel guides:
                        </p>
                        <ul style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px; padding-left: 20px;">
                            <li><span style="color: #1b1b1b; text-decoration: none; font-weight: 600;">Top Destinations:</span> Discover popular travel spots</li>
                            <li><span style="color: #1b1b1b; text-decoration: none; font-weight: 600;">Travel Tips:</span> Plan your perfect trip</li>
                            <li><span style="color: #1b1b1b; text-decoration: none; font-weight: 600;">FAQs:</span> Answers to common travel questions</li>
                        </ul>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            We look forward to helping you plan your next adventure!
                        </p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            Best regards,<br/>
                            The Tourism Co Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                        <p style="font-size: 14px; color: #999999; margin: 0;">
                            © ${new Date().getFullYear()} Tourism Co. All rights reserved.
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    // Admin notification email template
    const adminEmailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="background-color: #f4f4f4; width: 100%; height: 20px;"></div>
            <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                    <td style="padding: 20px;">
                        <h1 style="font-size: 24px; color: #333333; margin: 0 0 20px;">New Contact Form Submission</h1>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            You have received a new message via the contact form on <strong>Tourism Co</strong>.
                        </p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            <strong>Submission Details:</strong><br/>
                            Name: ${name}<br/>
                            Email: ${email}<br/>
                            Message: ${message}<br/>
                            Submitted at: ${new Date().toLocaleString()}
                        </p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5; margin: 0 0 20px;">
                            Please review the message and respond to the user as needed.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                        <p style="font-size: 14px; color: #999999; margin: 0;">
                            © ${new Date().getFullYear()} Tourism Co. All rights reserved.
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    // Email options for user
    const userMailOptions = {
        from: `"Tourism Co" <${process.env.CONTACT_EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Contacting Tourism Co!",
        html: userEmailTemplate,
    };

    // Email options for admin
    const adminMailOptions = {
        from: `"Tourism Co" <${process.env.CONTACT_EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL_USER,
        subject: "New Contact Form Submission",
        html: adminEmailTemplate,
    };

    // Send both emails
    try {
        await transporter.verify();
        console.log("Sending emails to:", { userEmail: email, adminEmail: process.env.CONTACT_EMAIL_USER });

        await Promise.all([
            transporter.sendMail(userMailOptions),
            transporter.sendMail(adminMailOptions),
        ]);
        return NextResponse.json({
            message: "Message sent, saved to database, and confirmation emails sent successfully",
            success: true,
            data: { name, email, message }
        });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ error: `Failed to send confirmation emails: ${error.message}` }, { status: 500 });
    }
}