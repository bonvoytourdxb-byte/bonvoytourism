"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const HeaderComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500 ${isScrolled
        ? "bg-black/60 backdrop-blur-[4px] shadow-lg"
        : "bg-white/10 backdrop-blur-[2px] shadow-md"
        }`}
    >
      {/* Top Bar */}
      <div
        className={`flex justify-between items-center px-6 sm:px-10 md:px-14 lg:px-20 transition-all duration-500 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100 py-5"
          }`}
      >
        <p className="text-[11px]">Call Us : +02151 7778 009</p>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Image src="/images/home/facebook.png" alt="fb" width={16} height={16}
              unoptimized />
          </Link>
          <Link href="/" target="_blank">
            <Image src="/images/home/instagram.png" alt="insta" width={16} height={16}
              unoptimized />
          </Link>
          <Link href="/" target="_blank">
            <Image src="/images/home/twitter.png" alt="x" width={16} height={16}
              unoptimized />
          </Link>
        </div>
      </div>

      {/* Divider */}
      {!isScrolled && (
        <div className="w-full h-[1px] bg-[rgba(255,255,255,0.3)] my-2"></div>
      )}

      {/* Main Header */}
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-14 lg:px-20 py-4">
        <Link href="/">
          <Image src="/images/header/bonvoy-touris.webp" alt="logo" width={150} height={70} />
          {/* <Image src="/images/header/logo.png" alt="logo" width={152} height={50} /> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12 text-[13px] font-medium">
          <Link
            href="/"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/about" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            About
          </Link>
          <Link
            href="/gallery"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/gallery" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Gallery
          </Link>
          <Link
            href="/destination"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/destination" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Destination
          </Link>
          <Link
            href="/services"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/services" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Services
          </Link>
          {/* <Link
            href="/blog"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/blog" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Blog
          </Link> */}
          <Link
            href="/contact-us"
            className={`transition-colors duration-300 ease-in-out ${pathname === "/contact-us" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden my-4 flex flex-col gap-4 text-[14px] font-medium bg-white/10 backdrop-blur-lg rounded-lg p-4 mx-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/about" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            About
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/gallery" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Gallery
          </Link>
          <Link
            href="/destination"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/destination" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Destination
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/services" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Services
          </Link>
          {/* <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/blog" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Blog
          </Link> */}
          <Link
            href="/contact-us"
            onClick={() => setIsOpen(false)}
            className={`transition-colors duration-300 ease-in-out ${pathname === "/contact-us" ? "text-[#ff9219]" : "hover:text-[#ff9219]"
              }`}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default HeaderComp;