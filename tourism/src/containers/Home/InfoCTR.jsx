"use client";
import React from "react";
import Image from "next/image";

export default function InfoCTR() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <div className="flex flex-col md:flex-row text-center md:text-left justify-center items-center gap-4">
                <Image
                    src="/images/home/plane.png"
                    alt="Plane"
                    width={32}
                    height={32}
                />
                <div>
                    <h3 className="text-[#606060] uppercase font-semibold text-[17px]">300+ DESTINATION</h3>
                    <p className="text-[#606060] text-[13px]">Sed ut perspiciatis</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row text-center md:text-left justify-center items-center gap-4">
                <Image
                    src="/images/home/credit-card.png"
                    alt="Credit Card"
                    width={32}
                    height={32}
                    unoptimized
                />
                <div>
                    <h3 className="text-[#606060] uppercase font-semibold text-[17px]">AFFORDABLE PRICE</h3>
                    <p className="text-[#606060] text-[13px]">Sit voluptatem accusantium</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row text-center md:text-left justify-center items-center gap-4">
                <Image
                    src="/images/home/contact.png"
                    alt="Contact"
                    width={32}
                    height={32}
                    unoptimized
                />
                <div>
                    <h3 className="text-[#606060] uppercase font-semibold text-[17px]">GREAT CUSTOMERS</h3>
                    <p className="text-[#606060] text-[13px]">perspiciatis unde omnis</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row text-center md:text-left justify-center items-center gap-4">
                <Image
                    src="/images/home/hand-shake.png"
                    alt="Hand Shake"
                    width={32}
                    height={32}
                />
                <div>
                    <h3 className="text-[#606060] uppercase font-semibold text-[17px]">TRUSTED & SAFE</h3>
                    <p className="text-[#606060] text-[13px]">Accusantium natus</p>
                </div>
            </div>
        </div>
    );
}