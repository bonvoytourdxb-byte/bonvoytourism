"use client";
import React from "react";
import Link from "next/link";

export default function TopThreeCTR() {
    return (
        <div
            className="mt-12 md:mt-22 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
            <Link
                href={"/"}
                className="px-[20px] md:px-[60px] py-[40px] md:py-[60px] bg-cover bg-center text-center group"
                style={{ backgroundImage: "url('/images/home/top1.jpg')" }}
            >
                <h3 className="text-[26px] mb-[5px] font-semibold">ASIA</h3>
                <p className="text-[13px] mb-[15px]">Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet,ocurreret pertinacia pri an. No mei nibh consectetuer</p>
                <button
                    className="btn-slider text-[12px] border-3 border-[#fc9f1c] py-2 px-10 
                transition-all duration-600 ease-in-out  max-w-[174px] rounded-[2px] font-medium
              group-hover:bg-[#fc9f1c] group-hover:border-transparent relative overflow-hidden"
                >
                    View More
                    <span className="shine"></span>
                </button>
            </Link>
            <Link
                href={"/"}
                className="px-[20px] md:px-[60px] py-[40px] md:py-[60px] bg-cover bg-center text-center group"
                style={{ backgroundImage: "url('/images/home/top2.jpg')" }}
            >
                <h3 className="text-[26px] mb-[5px] font-semibold">Europe</h3>
                <p className="text-[13px] mb-[15px]">Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet,ocurreret pertinacia pri an. No mei nibh consectetuer</p>
                <button
                    className="btn-slider text-[12px] border-3 border-[#fc9f1c] py-2 px-10 
                transition-all duration-600 ease-in-out  max-w-[174px] rounded-[2px] font-medium
              group-hover:bg-[#fc9f1c] group-hover:border-transparent relative overflow-hidden"
                >
                    View More
                    <span className="shine"></span>
                </button>
            </Link>
            <Link
                href={"/"}
                className="px-[20px] md:px-[60px] py-[40px] md:py-[60px] bg-cover bg-center text-center group"
                style={{ backgroundImage: "url('/images/home/top3.jpg')" }}
            >
                <h3 className="text-[26px] mb-[5px] font-semibold">Africa</h3>
                <p className="text-[13px] mb-[15px]">Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet,ocurreret pertinacia pri an. No mei nibh consectetuer</p>
                <button
                    className="btn-slider text-[12px] border-3 border-[#fc9f1c] py-2 px-10 
                transition-all duration-600 ease-in-out  max-w-[174px] rounded-[2px] font-medium
              group-hover:bg-[#fc9f1c] group-hover:border-transparent relative overflow-hidden"
                >
                    View More
                    <span className="shine"></span>
                </button>
            </Link>
        </div>
    );
}
