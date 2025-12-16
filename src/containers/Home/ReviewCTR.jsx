"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "Source Title",
    customer: "Emma Watson",
    image: "/images/home/customer1.png",
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    source: "Another Source",
    customer: "John Doe",
    image: "/images/home/customer1.png",
  },
  {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    source: "Famous Magazine",
    customer: "Sophia Lee",
    image: "/images/home/customer1.png",
  },
];

export default function TopThreeCTR() {
  const [current, setCurrent] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % testimonials.length),
    onSwipedRight: () =>
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    trackMouse: true, 
  });

  return (
    <div className="relative mt-12 md:mt-22 grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
      <div
        {...handlers}
        className="order-2 lg:order-1 flex flex-col justify-center p-[20px] lg:p-[90px] bg-[#f9f9f9] relative"
      >
        <div className="italic border border-[#fc9f1c] p-[20px] lg:p-[40px] mb-[25px]">
          <p className="text-[13px] text-[#606060] leading-[25px] lg:leading-[40px] mb-[10px]">
            {testimonials[current].text}
          </p>
          <p className="text-[13px] text-[#606060]">
            - Someone famous in{" "}
            <span className="text-[#fc9f1c]">{testimonials[current].source}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <Image
            src={testimonials[current].image}
            alt="customer"
            width={93}
            height={97}
            className="rounded-full"
          />
          <h3 className="text-[14px] font-semibold text-[#606060]">
            {testimonials[current].customer}
          </h3>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-colors duration-300 ${
                current === index ? "bg-[#fc9f1c]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 w-full h-full">
        <Image
          src="/images/home/review.jpg"
          alt="review"
          width={926}
          height={787}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
