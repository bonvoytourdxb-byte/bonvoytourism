"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroComp({ bg, heading, para, link }) {
    const [startZoom, setStartZoom] = useState(false);

    useEffect(() => {
        setStartZoom(true);
    }, []);

    return (
        <div className="relative w-full h-full">
            <motion.div
                className="absolute inset-0"
                initial={{ y: "100%", opacity: 0.8, scale: 1.15 }}
                animate={{
                    y: "0%",
                    opacity: 1,
                    scale: startZoom ? 1 : 1.15,
                }}
                exit={{ y: "-100%" }}
                transition={{
                    y: { duration: 1, ease: "easeInOut" },
                    opacity: { duration: 1, ease: "easeInOut" },
                    scale: { duration: 8, ease: "easeOut" },
                }}
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <div className="relative z-10 flex items-center justify-center text-center min-h-screen p-5 md:p-0">
                <motion.div
                    key={heading} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col gap-4 items-center"
                >
                    <h2 className="text-white text-[30px] md:text-[45px] font-semibold leading-none">
                        {heading}
                    </h2>
                    <p className="text-white text-[18px] md:text-[24px]">{para}</p>
                    <Link
                        href={link}
                        className="btn-slider text-[12px] border-3 border-[#fc9f1c] py-2 px-10 
            transition-all duration-600 ease-in-out  max-w-[174px] rounded-[2px] font-medium
            hover:bg-[#fc9f1c] hover:border-transparent relative overflow-hidden"
                    >
                        More Detail
                        <span className="shine"></span>
                    </Link>

                </motion.div>
            </div>
        </div >
        // </div >
    );
}
export default HeroComp;
