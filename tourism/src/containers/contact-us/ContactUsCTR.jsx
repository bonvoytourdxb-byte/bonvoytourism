"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HeroCTR from "@/components/hero/HeroSectionComp";

function ContactUsCTR() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus("");
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            setIsMapLoaded(true);
        }, 3000);

        return () => clearTimeout(fallbackTimer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        try {
            const response = await fetch("/api/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setStatus("Message sent successfully! We'll get back to you soon.");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus(result.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            setStatus("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMapLoad = () => {
        setIsMapLoaded(true);
    };

    return (
        <div>
            <HeroCTR
                img="/images/home/bg-subheader.jpg"
                heading="Contact Us"
                para="Varius blandit sit amet"
            />
            <div className="w-full mt-12 md:mt-22 relative">
                {!isMapLoaded && (
                    <div className="w-full h-[450px] bg-gray-200 animate-pulse rounded-[4px]">
                        <div className="rounded-[4px] w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                    </div>
                )}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1485.4028651800347!2d74.46285355752791!3d31.582472942740477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391911d818ee344b%3A0x529dc1a16e4035aa!2sLahore%20Medical%20%26%20Dental%20College%20Rd%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1756891002714!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0, display: isMapLoaded ? "block" : "none", borderRadius: "4px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={handleMapLoad} 
                ></iframe>
            </div>
            <div className="flex flex-col md:flex-row gap-12 md:gap-30 justify-between mt-12 md:mt-22">
                <div className="flex-3">
                    <form
                        className="w-full text-[13px] space-y-4 "
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-[12px] items-center w-full border-2 border-[#f1f1f1] rounded-[4px] text-[#969595] px-[15px] py-[10px]">
                            <Image
                                src="/images/contact/user.png"
                                alt="user"
                                width={16}
                                height={16}
                            />
                            <input
                                className="w-full outline-none focus:outline-none"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="flex gap-[12px] items-center w-full border-2 border-[#f1f1f1] rounded-[4px] text-[#969595] px-[15px] py-[10px]">
                            <Image
                                src="/images/contact/email.png"
                                alt="email"
                                width={16}
                                height={16}
                            />
                            <input
                                className="w-full outline-none focus:outline-none"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="flex gap-[12px] items-start w-full border-2 border-[#f1f1f1] rounded-[4px] text-[#969595] px-[15px] py-[10px]">
                            <Image
                                src="/images/contact/chat.png"
                                alt="chat"
                                width={16}
                                height={16}
                            />
                            <textarea
                                className="w-full outline-none focus:outline-none resize-none"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows={8}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#ff9219] py-[10px] px-[50px] rounded-[4px] font-medium hover:bg-slate-400 transition-all duration-300 ease-in-out"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Now"}
                        </button>
                    </form>
                    {status && (
                        <p className={`text-[13px] mt-4 text-[#ffff] py-[10px] px-[50px] text-center rounded-[4px] ${status.includes("successfully") ? " bg-[#ff9219]" : "bg-red-600"}`}>
                            {status}
                        </p>
                    )}
                </div>
                <div className="space-y-4 flex-1">
                    <h3 className="text-[18px] font-medium text-[#606060]">Contact Information</h3>
                    <div className="w-full h-[2px] bg-[#ebebeb]"></div>
                    <p className="text-[13px] font-medium text-[#606060]">129 Park street, New York 10903</p>
                    <div className="w-full h-[2px] bg-[#ebebeb]"></div>
                    <div className="text-[13px] font-medium text-[#606060] flex gap-[12px] items-center">
                        <p>PHONE:</p>
                        <p>(+6221) 000 888 999</p>
                    </div>
                    <div className="w-full h-[2px] bg-[#ebebeb]"></div>
                    <div className="text-[13px] font-medium text-[#606060] flex gap-[12px] items-center">
                        <p>EMAIL:</p>
                        <p>youremail@gmail.com</p>
                    </div>
                    <div className="w-full h-[2px] bg-[#ebebeb]"></div>
                    <div className="text-[13px] font-medium text-[#606060] flex gap-[12px] items-center">
                        <p>WEB:</p>
                        <p>www.yourdomain.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUsCTR;