"use client";
import React, { useState, useEffect } from "react";
import IconComponent from "@/components/icon/Icon";
import { useRouter } from "next/navigation";

export default function FindAdventureCTR({ mt = "mt-12" }) {
    const [selectedDestination, setSelectedDestination] = useState("");
    const [destinations, setDestinations] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch("/api/packages");
                const data = await res.json();

                if (data.destinations) {
                    const uniqueDestinations = Array.from(
                        new Set(data.destinations.map(d => d.name))
                    );
                    setDestinations(uniqueDestinations);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };

        fetchDestinations();
    }, []);

    const handleFindNow = () => {
        router.push(`/destination?destination=${selectedDestination}`);
    };

    return (
        <div
            className={`${mt} bg-cover bg-center bg-no-repeat px-6 sm:px-10 md:px-14 lg:px-20 py-6 sm:py-10 md:py-14`}
            style={{ backgroundImage: "url('/images/home/bg-search.jpg')" }}
        >
            <h3 className="text-[24px] md:text-[30px] font-semibold mb-6 text-white">Find your adventure with us</h3>
            <p className="mt-2 text-white text-sm md:text-base mb-4">
                Choose your preferred destination and explore amazing travel packages curated just for you.
            </p>
            <div className="grid grid-cols-1 max-w-[400px]  gap-4 mb-4 md:mb-8 text-[13px] md:text-[16px]">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 md:mb-8 text-[13px] md:text-[16px]"> */}
                {/* <div>
                    <h3 className="text-[13px] font-medium mb-2">Keyword</h3>
                    <div className="relative flex items-center flex-2 box-border">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-white rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <IconComponent name="search" color='#85009D' size={16} />
                        </span>
                    </div>
                </div>
                <div>
                    <h3 className="text-[13px] font-medium mb-2"> Select your trip</h3>
                    <div className=" relative w-full">
                        <select
                            className="bg-white appearance-none rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                        >
                            <option value="">Category</option>
                            <option value="ecommerce">UAE</option>
                            <option value="cybersecurity">UAE</option>
                            <option value="sustainable">UAE</option>
                        </select>

                        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                            <IconComponent name="drop-down" color="#808080" size={16} />
                        </div>
                    </div>
                </div> */}
                <div>
                    <h3 className="text-[13px] font-medium mb-2">Destination</h3>
                    <div className=" relative w-full">
                        <select
                            value={selectedDestination}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                            className="bg-white appearance-none rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                        >
                            <option value="">Select Destination</option>
                            {destinations.map((dest, index) => (
                                <option key={index} value={dest}>{dest}</option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                            <IconComponent name="drop-down" color="#808080" size={16} />
                        </div>
                    </div>
                </div>
                {/* <div>
                    <h3 className="text-[13px] font-medium mb-2">Duration</h3>
                    <div className=" relative w-full">
                        <select
                            className="bg-white appearance-none rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                        >
                            <option value="">Category</option>
                            <option value="ecommerce">UAE</option>
                            <option value="cybersecurity">UAE</option>
                            <option value="sustainable">UAE</option>
                        </select>

                        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                            <IconComponent name="drop-down" color="#808080" size={16} />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-[13px] font-medium mb-2">Date</h3>
                    <div className="relative w-full">
                        <input
                            type="date"
                            id="custom-date"
                            className="bg-white rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById("custom-date").showPicker?.()}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <IconComponent name="calendar" color="#969595" size={16} />
                        </button>
                    </div>
                </div> */}

                <button
                    onClick={handleFindNow}
                    className="bg-[#ff9219] mt-[8px] md:mt-0 py-2 px-3 rounded-[4px] font-medium hover:bg-slate-400 transition-all duration-300 ease-in-out">
                    FIND NOW
                </button>
            </div>
        </div>
    );
}
