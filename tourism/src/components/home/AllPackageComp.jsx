// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// export default function AllPackages({ data }) {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);
//   const [navReady, setNavReady] = useState(false);

//   useEffect(() => {
//     if (!swiperRef.current || !prevRef.current || !nextRef.current) return;
//     swiperRef.current.params.navigation.prevEl = prevRef.current;
//     swiperRef.current.params.navigation.nextEl = nextRef.current;
//     swiperRef.current.navigation.destroy();
//     swiperRef.current.navigation.init();
//     swiperRef.current.navigation.update();
//     setNavReady(true);
//   }, []);

//   return (
//     <div className="relative mt-12 md:mt-22 group">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         spaceBetween={15}
//         slidesPerView={1}
//         centeredSlides={true}
//         loop={true}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 3,
//             spaceBetween: 15,
//           },
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 15,
//           },
//         }}
//         className="mySwiper"
//       >
//         {data.map((pkg, index) => (
//           <SwiperSlide key={`pkg-${index}`}>
//             <div className="max-w-[350px] mx-auto">
//               <Image
//                 src={pkg.img}
//                 alt={pkg.title}
//                 width={463}
//                 height={309}
//                 className="w-full h-auto"
//               />
//               <div className="py-5 px-8 flex justify-between border border-[#ddd]">
//                 <div>
//                   <h3 className="text-[#4E4E4E] text-[20px] font-semibold">
//                     {pkg.title}
//                   </h3>
//                   <p className="text-[#8C8C8C] text-[13px]">
//                     Duration: {pkg.duration}
//                   </p>
//                   <div className="flex gap-4 items-center mt-5">
//                     <p className="text-[11px] text-[#ff9219] mr-[11px]">
//                       {pkg.rating}
//                     </p>
//                     <p className="text-[11px] text-[#666]">{pkg.reviews}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-[13px] text-[#4E4E4E]">From</p>
//                   <h3 className="text-[#ff9219] text-[18px] font-semibold">
//                     {pkg.price}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Nav Buttons */}
//       <div
//         ref={prevRef}
//         className="swiper-button-prev hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 backdrop-blur-[4px] shadow-lg p-2 rounded-full hover:bg-black/80 z-10 items-center justify-center"
//       ></div>
//       <div
//         ref={nextRef}
//         className="swiper-button-next hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 backdrop-blur-[4px] shadow-lg p-2 rounded-full hover:bg-black/80 z-10 items-center justify-center"
//       ></div>

//       <style jsx>{`
//         /* Base button styles */
//         .swiper-button-prev,
//         .swiper-button-next {
//           width: 40px;
//           height: 40px;
//         }

//         .swiper-button-prev::after,
//         .swiper-button-next::after {
//           font-size: 20px;
//           color: white;
//         }

//         /* Force hide on mobile */
//         @media (max-width: 767px) {
//           .swiper-button-prev,
//           .swiper-button-next {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SkeletonCard from "../skeletoncard/SkeleotoncardComp";

export default function AllPackages() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/packages");
        const json = await res.json();
        setData(json.packages || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12 md:mt-22">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }


  return (
    <div className="relative mt-12 md:mt-22 group">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {data.map((pkg) => (
          <SwiperSlide key={pkg.id}>
            <Link
              href={`/destination/${pkg.id}`}
              className="max-w-[350px] mx-auto h-full flex flex-col"
            >
              <Image
                src={pkg.img}
                alt={pkg.title}
                width={463}
                height={309}
                className="w-full h-auto md:h-[250px]"
              />
              <div className="py-5 px-3 md:px-5 flex flex-col justify-between h-full border border-[#ddd] min-h-[190px]">
                <h3 className="text-[#4E4E4E] text-[18px] lg:text-[18px] font-semibold">{pkg.title}</h3>
                <div className="flex justify-between gap-4 items-center mt-3">
                  <div>
                    <p className="text-[#8C8C8C] text-[13px]">Duration {pkg.duration}</p>
                    <p className="text-[11px] text-[#ff9219] mr-[11px]">{pkg.rating}</p>
                    <p className="text-[11px] text-[#6666]">{pkg.reviews}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] text-[#4E4E4E]">From</p>
                    <h3 className="text-[#ff9219] text-[18px] font-semibold">{pkg.price}</h3>
                  </div>
                </div>
              </div>
            </Link>
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
