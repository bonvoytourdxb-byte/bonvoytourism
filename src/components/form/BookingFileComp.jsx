"use client";
import React, { useState, useRef, useEffect } from "react";
import IconComponent from "@/components/icon/Icon";

export default function BookingFileComp({ onClose, detail, isOpen }) {
    console.log("detail",detail);
    
    const modalRef = useRef(null);
    const [step, setStep] = useState(1);
    const [people, setPeople] = useState(1);
    const packageName = detail?.hero_heading || "Tour Package";
    const packagePrice = detail?.price;
    const totalPrice = packagePrice * people;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        zipCode: "",
        city: "",
        email: "",
        phone: "",
        termsAccepted: false,
        subscribe: false
    });

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            // Prevent touchmove on background, allow in modal
            const preventTouch = (e) => {
                if (!modalRef.current) return;
                const isInsideModal = modalRef.current.contains(e.target);
                if (!isInsideModal) {
                    e.preventDefault();
                    return;
                }

                // Optional: prevent overscroll on modal edges (mobile)
                const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
                if (scrollHeight <= clientHeight) return; // nothing to scroll

                const touch = e.touches[0];
                const deltaY = e.targetTouches[0].clientY - touch.clientY;

                if ((scrollTop === 0 && deltaY > 0) || (scrollTop + clientHeight >= scrollHeight && deltaY < 0)) {
                    e.preventDefault();
                }
            };

            document.addEventListener("touchmove", preventTouch, { passive: false });

            return () => {
                const top = parseInt(document.body.style.top || "0", 10);
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, -top);
                document.removeEventListener("touchmove", preventTouch);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        const form = e.target.closest("form");

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(formData.email)) {
        //     alert("Please enter a valid email address");
        //     return;
        // }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            return;
        }


        setStep(2);
    };

    const handleStripePayment = async () => {
        try {
            const payload = {
                packageName,
                packagePrice,
                people,
                totalAmount: totalPrice,
                customer: formData
            };

            const response = await fetch("/api/create-stripe-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to create Stripe session.");
            }
        } catch (error) {
            console.error("Stripe payment error:", error);
            alert("Something went wrong with the payment.");
        }
    };


    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/30 z-[200] flex items-center justify-center px-3"
        >
            <div
                ref={modalRef}
                className="max-w-[1134px] w-full max-h-[90vh] overflow-y-auto p-4 md:p-6 
                bg-[#ffff] relative rounded-md border border-[#DBBB89] custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-[20px] md:text-3xl text-[#666] mt-3 md:mt-0">
                        {step === 1 ? "Personal & Professional Details" : "Review & Payment"}
                    </h3>
                    <button
                        className="absolute top-4 right-4 text-2xl"
                        onClick={onClose}
                    >
                        <IconComponent name="close" color="#666" size={16} />
                    </button>
                </div>
                {step === 1 && (

                    <form className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    First Name *
                                </label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    Last Name *
                                </label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter last name"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col mb-5 text-[14px] md:text-[16px]">
                            <label className="text-[#666] font-medium mb-1">
                                Company Name
                            </label>
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                type="text"
                                className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                placeholder="Enter company name"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    Zip Code *
                                </label>
                                <input
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter zip code"
                                />
                            </div>

                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    City *
                                </label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter city"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mb-5">
                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    Email *
                                </label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="flex flex-col text-[14px] md:text-[16px]">
                                <label className="text-[#666] font-medium mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">

                            <label className="inline-flex gap-3 items-start text-[#4E4E4E] text-[14px] cursor-pointer">
                                <div className="mt-[5px] md:mt-[2px]">
                                    <input
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        type="checkbox"
                                        className="w-[16px] h-[16px]"
                                    />
                                </div>
                                <span>I have read and accepted the terms of business conditions *</span>
                            </label>

                            <label className="inline-flex gap-3 items-start text-[#4E4E4E] text-[14px] cursor-pointer">
                                <div className="mt-[2px]">
                                    <input
                                        name="subscribe"
                                        checked={formData.subscribe}
                                        onChange={handleChange}
                                        type="checkbox"
                                        className="w-[16px] h-[16px]"
                                    />
                                </div>
                                <span>Subscribe to our Newsletter</span>
                            </label>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleNext}
                                className="bg-[#ff9219] text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-medium 
                        hover:bg-slate-400 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-[#B0B0B0] p-4 rounded-md">
                                <h2 className="font-semibold mb-3 text-[#666]">Your Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#666] font-medium text-[14px] md:text-[16px]">
                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Name</span>
                                        <span className="text-[#999]">{formData.firstName} {formData.lastName}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Company</span>
                                        <span className="text-[#999]">{formData.companyName}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">City</span>
                                        <span className="text-[#999]">{formData.city}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">ZipCode</span>
                                        <span className="text-[#999]">{formData.zipCode}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Email</span>
                                        <span className="text-[#999]">{formData.email}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Phone</span>
                                        <span className="text-[#999]">{formData.phone}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Terms Accepted</span>
                                        <span className="text-[#999]">{formData.termsAccepted ? "Yes" : "No"}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#666] mb-1">Subscribed</span>
                                        <span className="text-[#999]">{formData.subscribe ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-[#B0B0B0] p-4 rounded-md flex flex-col justify-between">
                                <div>
                                    <h4 className="font-semibold text-[#666] mb-3">{packageName}</h4>
                                    <p className="text-[#666] mb-2">Price per person: <span className="text-[#999]">AED {packagePrice}</span></p>
                                    <div className="flex flex-col gap-1 mb-3">
                                        <label className="text-[#666] font-medium mb-1">Number of People:</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={people || "0"}
                                            onChange={(e) => setPeople(parseInt(e.target.value))}
                                            className="border border-[#B0B0B0] rounded-md p-2 bg-white text-[#4E4E4E] focus:border-[#ff9219] focus:ring-1 focus:ring-[#ff9219] transition-all duration-300 outline-none w-full"
                                        />
                                    </div>

                                    <p className="text-[#666] font-medium">Total: <span className="text-[#999]">AED {totalPrice}</span></p>
                                </div>
                                <div>
                                    <button
                                        onClick={handleStripePayment}
                                        className="bg-[#ff9219] text-white px-6 py-2 md:px-8 md:py-3 rounded-md w-full mt-4 hover:bg-slate-400 transition-all"
                                    >
                                        Pay with Stripe
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="mt-6 flex justify-between gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="bg-[#ff9219] px-6 py-2 md:px-8 md:py-3 rounded-md font-medium hover:bg-gray-400 transition-all"
                            >
                                Back
                            </button>
                            <button
                                disabled
                                className="bg-[#ff9219] text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-medium opacity-50 cursor-not-allowed"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
