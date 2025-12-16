"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterComp = () => {

    return (
        <footer
            style={{
                boxShadow: "0 0 0 100vmax #090c0d",
                clipPath: "inset(0 -100vmax)",
            }}
            className="bg-[#090c0d] mt-12 md:mt-22 py-[60px] flex flex-col md:flex-row gap-4 justify-between items-center text-[12px] font-light text-[#ebebeb]">
            <div className="text-center md:text-left">
                <p className="mb-2">Email: companyname@gmail.com</p>
                <p>Copyright - 2018 Plesire Travel All Right Reserved</p>
            </div>
            <Link href="/"><Image src="/images/header/logo.png" alt="logo" width={152} height={50} /></Link>
            <div className="text-center md:text-right">
                <p className="mb-2">129 Park street, New York City, NY 10903</p>
                <p>Phone: (+6221) 999 999 999</p>
            </div>
        </footer>
    );
};

export default FooterComp;
