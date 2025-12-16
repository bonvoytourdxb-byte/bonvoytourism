"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FindAdventureCTR() {
    return (
        <div
            className="mt-12 md:mt-22 flex flex-col md:flex-row justify-between items-center gap-10"
        >
            <div className="basis-[50%]">
                <Image
                    src="/images/home/map.jpg"
                    alt="map"
                    width={820}
                    height={406}
                />
            </div>
            <div className="basis-[50%]">
                <h3 className="text-[#666] font-semibold text-[24px] md:text-[26px]">Top Rated Our Tours</h3>
                <p className="text-[#999999] text-[16px] md:text-[17px]">No mei consectetuer</p>
                <div className="w-[45px] bg-[#ff9219] h-[2px] my-[20px]"></div>
                <p className="text-[13px] text-[#4E4E4E] mb-5">Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet,ocurreret pertinacia pri an. No mei nibh consectetuer</p>
                {/* <div className="my-[20px]">
                    <Link href="/" className="hover:text-[#ff9219] hover:underline underline-offset-4 text-[#4E4E4E] font-medium text-[18px] transition-all duration-300 ease-in-out">
                        UAE<span className="text-[11px] italic ml-[4px] align-super">(40)tours</span>
                    </Link>
                </div> */}
                <div>
                    <Link
                        href="/destination"
                        className="bg-[#ff9219] py-2 px-3 rounded-[4px] font-medium hover:bg-slate-400 transition-all duration-300 ease-in-out">
                        ALL DESTINATION
                    </Link>
                </div>
            </div>
        </div>
    );
}
