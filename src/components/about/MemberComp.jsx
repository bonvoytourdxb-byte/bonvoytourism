"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function MemberComp({ data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;
    swiperRef.current.params.navigation.prevEl = prevRef.current;
    swiperRef.current.params.navigation.nextEl = nextRef.current;
    swiperRef.current.navigation.destroy();
    swiperRef.current.navigation.init();
    swiperRef.current.navigation.update();
    setNavReady(true);
  }, []);

  return (
    <div className="relative mt-12 md:mt-22 group">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        className="mySwiper"
      >
        {data.map((member, index) => (
          <SwiperSlide key={`member-${index}`}>
            <div className="max-w-[350px] mx-auto relative overflow-hidden group/card">
              <Image
                src={member.img}
                alt={member.name}
                width={463}
                height={450}
                className="w-[436px] h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-black/60 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center py-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-in-out">
                <h3 className="text-[21px] font-medium">{member.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Nav Buttons */}
      <div
        ref={prevRef}
        className="swiper-button-prev hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 backdrop-blur-[4px] shadow-lg p-2 rounded-full hover:bg-black/80 z-10 items-center justify-center"
      ></div>
      <div
        ref={nextRef}
        className="swiper-button-next hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 backdrop-blur-[4px] shadow-lg p-2 rounded-full hover:bg-black/80 z-10 items-center justify-center"
      ></div>

      <style jsx>{`
        /* Base button styles */
        .swiper-button-prev,
        .swiper-button-next {
          width: 40px;
          height: 40px;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
          color: white;
        }

        /* Force hide on mobile */
        @media (max-width: 767px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}