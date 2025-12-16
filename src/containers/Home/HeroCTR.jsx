"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HeroComp from "@/components/home/hero/HeroComp";

const heroData = [
  {
    bg: "/images/home/hero-1.jpg",
    heading: "The New Adventure Travel",
    para: "Discover hidden places in the world",
    link: "/",
  },
  {
    bg: "/images/home/hero-2.jpg",
    heading: "Amazing Diversity on Travel",
    para: "For your vacation",
    link: "/",
  },
  {
    bg: "/images/home/hero-3.jpg",
    heading: "Perfect Place on Vacation",
    para: "Asia, Africa, Australia",
    link: "/",
  },
];

export default function HeroCTR() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      goNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroData.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <HeroComp
            bg={heroData[currentIndex].bg}
            heading={heroData[currentIndex].heading}
            para={heroData[currentIndex].para}
            link={heroData[currentIndex].link}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        className={`hidden md:block absolute left-5 top-1/2 -translate-y-1/2 transition-opacity cursor-pointer z-20 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image
          src="/images/home/arrow-left.png"
          alt="Previous"
          width={32}
          height={32}
          unoptimized
        />
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        className={`hidden md:block absolute right-5 top-1/2 -translate-y-1/2 transition-opacity cursor-pointer z-20 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image
          src="/images/home/arrow-right.png"
          alt="Next"
          width={32}
          height={32}
          unoptimized
        />
      </button>
    </div>
  );
}