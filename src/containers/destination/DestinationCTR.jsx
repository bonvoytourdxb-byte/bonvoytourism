"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import HeroCTR from "@/components/hero/HeroSectionComp";
import IconComponent from "@/components/icon/Icon";
import SkeletonCard from "@/components/skeletoncard/SkeleotoncardComp";

function DestinationCTR() {
    const searchParams = useSearchParams();
    const destinationParam = searchParams.get("destination") || "";
    const [packages, setPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (destinationParam) params.append("destination", destinationParam);

                const res = await fetch(`/api/packages?${params.toString()}`);
                const data = await res.json();
                setPackages(data.packages);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchPackages();
    }, [destinationParam]);

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
                console.error(error);
            }
        };
        fetchDestinations();
    }, []);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedDestination) params.append("destination", selectedDestination);

            const res = await fetch(`/api/packages?${params.toString()}`);
            const data = await res.json();
            setPackages(data.packages);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const totalPages = Math.ceil(packages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPackages = packages.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <HeroCTR
                img="/images/home/bg-subheader.jpg"
                heading="Our Destination"
                para="Varius blandit sit amet"
            />

            <div className="mt-12 md:mt-22 flex flex-col md:flex-row gap-[20px] md:gap-[30px]">
                <div
                    className="md:flex-1 rounded-[4px] bg-cover bg-left bg-no-repeat py-[30px] md:py-[60px] px-[20px]"
                    style={{ backgroundImage: "url('/images/destination/destination.jpg')" }}
                >
                    <h3 className="text-[24px] md:text-[26px] font-semibold mb-3 text-white">Search Results</h3>
                    <h3 className="text-[13px] font-medium mb-3">{packages.length} Results Found</h3>

                    <div className="grid grid-cols-1 gap-[20px] md:gap-[30px] mb-4 md:mb-8 text-[13px]">
                        {/* Destination */}
                        <div>
                            <h3 className="text-[13px] font-medium mb-2">Destination</h3>
                            <div className="relative w-full">
                                <select
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    className="bg-white appearance-none rounded-[4px] py-2 px-3 pr-10 text-[#969595] w-full focus:outline-none focus:border-[#85009D]"
                                >
                                    {destinations.map((dest, index) => (
                                        <option
                                            key={dest + index}
                                            value={dest === "Any" ? "" : dest}
                                        >
                                            {dest}
                                        </option>
                                    ))}

                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <IconComponent name="drop-down" color="#808080" size={16} />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={fetchPackages}
                            className="bg-[#ff9219] mt-[8px] md:mt-0 py-2 px-3 rounded-[4px] font-medium hover:bg-slate-400 transition-all duration-300 ease-in-out"
                        >
                            FIND NOW
                        </button>
                    </div>
                </div>

                {/* Packages & Pagination */}
                <div className="md:flex-4">
                    <div className="flex justify-end mb-5 space-x-2">
                        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-2 py-2 bg-[#ff9219] rounded text-white disabled:opacity-50">
                            <Image src="/images/home/arrow-left.png" alt="Previous" width={22} height={22} unoptimized />
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)}
                                className={`min-w-[40px] text-center px-3 py-2 rounded ${currentPage === i + 1 ? "bg-[#ff9219] text-white" : "bg-gray-200 text-black"}`}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-2 bg-[#ff9219] rounded text-white disabled:opacity-50">
                            <Image src="/images/home/arrow-right.png" alt="Next" width={22} height={22} unoptimized />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[30px]">
                        {loading
                            ? Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
                            : paginatedPackages.map((pkg, index) => (
                                <Link href={`/destination/${pkg.id}`} key={pkg.id} className="w-full md:max-w-[350px] flex-shrink-0 shadow-md rounded-md overflow-hidden flex flex-col">
                                    {/* <Link href={pkg.href} key={index} className="w-full md:max-w-[350px] flex-shrink-0 shadow-md rounded-md overflow-hidden flex flex-col"> */}
                                    <Image src={pkg.img} alt={pkg.title} width={700} height={500} className="w-full h-auto" />
                                    <div className="py-5 px-3 md:px-5 flex flex-col justify-between h-full">
                                        <h3 className="text-[#4E4E4E] text-[18px] lg:text-[20px] font-semibold">{pkg.title}</h3>
                                        <div className="flex justify-between gap-4 items-center mt-5">
                                            <div>
                                                <p className="text-[#8C8C8C] text-[13px]">Duration {pkg.duration}</p>
                                                <p className="text-[11px] text-[#ff9219] mr-[11px]">{pkg.rating}</p>
                                                <p className="text-[11px] text-[#6666]">{pkg.reviews}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[13px] text-[#4E4E4E]">From</p>
                                                <h3 className="text-[#ff9219] text-[18px] font-semibold">{pkg.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DestinationCTR;
