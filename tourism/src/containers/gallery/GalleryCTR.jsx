"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import HeroCTR from "@/components/hero/HeroSectionComp";

function GalleryCTR() {
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (selectedImage) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            const preventTouch = (e) => {
                if (!modalRef.current) return;
                const isInsideModal = modalRef.current.contains(e.target);
                if (!isInsideModal) {
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
    }, [selectedImage]);


    const images = [
        "/images/gallery/gallery6.jpg",
        "/images/gallery/gallery3.jpg",
        "/images/gallery/gallery5.jpg",
        "/images/gallery/gallery2.jpg",
        "/images/gallery/gallery4.jpg",
        "/images/gallery/gallery1.jpg",
    ];

    return (
        <div>
            <HeroCTR
                img="/images/home/bg-subheader.jpg"
                heading="Gallery"
                para="Varius blandit sit amet"
            />
            <div className="flex mt-12 md:mt-22">
                <h3 className="text-[18px] border-1 border-[#606060] hover:border-[#FC9F1C] font-medium text-[#606060] px-3 py-1 rounded-[4px] transition-all duration-300">UAE</h3>
            </div>
            <div className="w-full mt-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="mb-2 break-inside-avoid overflow-hidden rounded-[4px] relative group cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`gallery${index}`}
                                width={532}
                                height={600}
                                className="w-full rounded-[4px] transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                <button
                                    onClick={() => setSelectedImage(src)}
                                    className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition"
                                >
                                    <ZoomIn className="text-white w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-5 bg-[#FC9F1C] hover:bg-[#E08B17] w-[30px] h-[30px] flex justify-center items-center rounded-full z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        ✕
                    </button>

                    <div
                        className="relative max-w-4xl w-full px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <Image
                            src={selectedImage}
                            alt="popup"
                            width={532}
                            height={600}
                            className="object-cover bg-center w-full md:w-[832px] h-full md:h-[600px] rounded-[4px] shadow-lg"
                        /> */}
                        <div
                            className="bg-contain bg-no-repeat bg-center w-full md:w-[832px] h-[600px] rounded-[4px] shadow-lg"
                            style={{ backgroundImage: `url(${selectedImage})` }}
                        />

                    </div>
                </div>
            )}

        </div>
    );
}

export default GalleryCTR;
