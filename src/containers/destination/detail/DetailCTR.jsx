"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IconComponent from "@/components/icon/Icon";
import { useParams } from "next/navigation";

import HeroCTR from "@/components/hero/HeroSectionComp";
import BookingFileComp from "@/components/form/BookingFileComp";

function DetailCTR() {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [showBooking, setShowBooking] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await fetch(`/api/package_detail?id=${id}`);
            const data = await res.json();
            setDetail(data.package_detail);
        };
        fetchDetail();
    }, [id]);

    if (!detail)
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="w-16 h-16 border-4 border-t-[#ff9219] border-gray-200 rounded-full animate-spin"></div>
            </div>
        );


    const parseJSON = (str) => {
        if (!str) return [];
        try {
            return typeof str === "string" ? JSON.parse(str) : str;
        } catch {
            return [];
        }
    };

    const highlights = parseJSON(detail.highlights);
    const departureDetails = parseJSON(detail.departure_details);
    const returnDetails = parseJSON(detail.return_details);
    const additionalInfo = parseJSON(detail.additional_info);
    const termsConditions = parseJSON(detail.terms_conditions);
    const cancellationPolicy = parseJSON(detail.cancellation_policy);
    const faqs = parseJSON(detail.faqs);
    const priceIncludes = parseJSON(detail.price_includes);
    const priceExcludes = parseJSON(detail.price_excludes);
    const tags = parseJSON(detail.tags);

    return (
        <div>
            <HeroCTR
                img={detail.hero_img || "/images/home/bg-subheader.jpg"}
                heading={detail.hero_heading || "Tour Package"}
            />

            <div className="mt-12 md:mt-22 flex flex-col md:flex-row gap-[5px] md:gap-[30px]">
                {/* Main Content - Left Side */}
                <div className="flex-4">
                    {/* Slider Image 1 */}
                    {detail.slider1_img && (
                        <div className="mb-5">
                            <Image
                                src={detail.slider1_img}
                                alt="Tour main"
                                width={1200}
                                height={750}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    <h3 className="text-[#666] my-5 font-semibold text-[24px] md:text-[28px]">
                        HIGHLIGHTS
                    </h3>
                    <div className="flex flex-col gap-3 mb-8">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-[5px]">
                                    <IconComponent name="circlecheckbox" color="#ff9219" size={13} />
                                </div>
                                <p className="text-[#4E4E4E] text-[14px] md:text-[16px]">{item}</p>
                            </div>
                        ))}
                    </div>

                    {detail.slider2_img && (
                        <div className="mb-5">
                            <Image
                                src={detail.slider2_img}
                                alt="Tour secondary"
                                width={1200}
                                height={750}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    <h3 className="text-[#666] my-5 font-semibold text-[24px] md:text-[28px]">
                        What to Expect
                    </h3>

                    <h3 className="text-[18px] text-[#666] font-semibold mb-2">Departure Details</h3>
                    <div className="flex flex-col gap-3 mb-5">
                        {departureDetails.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-[5px]">
                                    <IconComponent name="circlecheckbox" color="#ff9219" size={13} />
                                </div>
                                <p className="text-[#4E4E4E] text-[14px] md:text-[16px]">{item}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-[18px] text-[#666] font-semibold mb-2">Return Details</h3>
                    <div className="flex flex-col gap-3 mb-5">
                        {returnDetails.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-[5px]">
                                    <IconComponent name="circlecheckbox" color="#ff9219" size={13} />
                                </div>
                                <p className="text-[#4E4E4E] text-[14px] md:text-[16px]">{item}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-[18px] text-[#666] font-semibold mb-2">Additional Information</h3>
                    <div className="flex flex-col gap-3 mb-5">
                        {additionalInfo.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-[5px]">
                                    <IconComponent name="circlecheckbox" color="#ff9219" size={13} />
                                </div>
                                <p className="text-[#4E4E4E] text-[14px] md:text-[16px]">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>

                    <h3 className="text-[#666] my-5 font-semibold text-[24px] md:text-[28px]">
                        Itinerary
                    </h3>
                    <h3 className="text-[18px] text-[#666] font-semibold mb-2">Terms & Conditions</h3>
                    <div className="flex flex-col gap-3 mb-5">
                        {termsConditions.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-[5px]">
                                    <IconComponent name="circlecheckbox" color="#ff9219" size={13} />
                                </div>
                                <p className="text-[#4E4E4E] text-[14px] md:text-[16px]">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>

                    <h3 className="text-[18px] text-[#666] font-semibold mb-2">Cancellation Policy</h3>
                    <div className="flex flex-col gap-3 mb-5">
                        {cancellationPolicy.map((item, i) => (
                            <p key={i} className="text-[#4E4E4E] text-[14px]">{item}</p>
                        ))}
                    </div>

                    <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>

                    {detail.other_emirate_pickup && (
                        <>
                            <h3 className="text-[18px] text-[#666] font-semibold mb-2">Other Emirate Pickup</h3>
                            <div className="flex flex-col gap-3 mb-5">
                                <p className="text-[#4E4E4E] text-[14px]">{detail.other_emirate_pickup}</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>
                        </>
                    )}

                    <h3 className="text-[#666] font-semibold text-[24px] md:text-[28px] mb-5">
                        Location
                    </h3>
                    <div className="w-full h-[300px] md:h-[500px] mb-5">
                        {detail.location_iframe_src ? (
                            <iframe
                                title="Tour Location"
                                src={detail.location_iframe_src}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                                No map available
                            </div>
                        )}
                    </div>

                    <div className="w-full h-[1px] bg-[#666] mt-8 mb-5"></div>

                    <h3 className="text-[#666] font-semibold text-[24px] md:text-[28px] mb-5">
                        FAQ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqs.map((item, i) => (
                            <div key={i}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <h3 className="text-[18px] text-[#666] font-semibold">
                                        {item.q || item.question}
                                    </h3>
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="#666"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openIndex === i
                                        ? "max-h-[300px] opacity-100 mt-3"
                                        : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-[#4E4E4E] text-[14px] md:text-[16px] mb-5">
                                        {item.a || item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-2">
                    <h3 className="text-[#FC9F1C] text-[32px] md:text-[60px] font-playfair mb-1">
                        AED {detail.price}
                        <span className="text-[16px]">/ person</span>
                    </h3>
                    {detail.price_info && (
                        <p className="text-[13px] text-[#4E4E4E] mb-5">{detail.price_info}</p>
                    )}

                    <button
                        onClick={() => setShowBooking(true)}
                        className="bg-[#ff9219] w-full mt-[8px] mb-5 md:mt-0 py-3 px-3 rounded-[4px] font-medium hover:bg-slate-400 transition-all duration-300 ease-in-out text-white cursor-pointer">
                        BOOK NOW
                    </button>
                    {showBooking && (
                        <BookingFileComp
                            isOpen={showBooking}
                            onClose={() => setShowBooking(false)}
                            detail={detail}
                        />
                    )}

                    {tags.length > 0 && (
                        <>
                            <h4 className="inline-block text-[#666] mt-5 font-semibold text-[20px] border-b-2 border-b-[#ff9219]">
                                Tags
                            </h4>
                            <div className="flex flex-wrap gap-3 mt-5">
                                {tags.map((tag, i) => (
                                    <p
                                        key={i}
                                        className="text-[13px] text-[#4E4E4E] border border-[#EFEFEF] text-center py-1 px-2 hover:text-[#ff9219] hover:border-[#ff9219] transition-all duration-300 ease-in-out cursor-pointer"
                                    >
                                        {tag}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}

                    {priceIncludes.length > 0 && (
                        <>
                            <h3 className="text-[#666] mt-8 font-semibold text-[24px] md:text-[28px]">
                                Price Includes
                            </h3>
                            <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>
                            <div className="flex flex-col gap-3 mb-5">
                                {priceIncludes.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <IconComponent name="checkbox" color="#ff9219" size={13} />
                                        <p className="text-[13px] text-[#4E4E4E]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {priceExcludes.length > 0 && (
                        <>
                            <h3 className="text-[#666] mt-5 font-semibold text-[24px] md:text-[28px]">
                                Price Excludes
                            </h3>
                            <div className="w-full h-[1px] bg-[#666] mt-3 mb-5"></div>
                            <div className="flex flex-col gap-3 mb-5">
                                {priceExcludes.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <IconComponent name="crosscheckbox" color="#ff9219" size={13} />
                                        <p className="text-[13px] text-[#4E4E4E]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailCTR;