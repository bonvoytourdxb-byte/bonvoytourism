"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

const BackToTopComp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[#FC9F1C] text-white p-3 rounded-[4px] shadow-lg hover:bg-[#E08B17] transition-all duration-300 z-50"
                    aria-label="Back to top"
                >
                    <Image
                        src="/images/home/up.png"
                        alt="up"
                        width={16}
                        height={16}
                        unoptimized
                    />
                </button>
            )}
        </>
    );
};

export default BackToTopComp;
