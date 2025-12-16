"use client";
import React from "react";
import AllMember from "@/components/about/MemberComp";

const member = [
  {
    img: "/images/home/package1.jpg",
    name: "John White",
  },
  {
    img: "/images/home/package2.jpg",
    name: "Rachel Keating", 
  },
  {
    img: "/images/home/package3.jpg",
    name: "Smith Pro",
  },
  {
    img: "/images/home/package1.jpg",
    name: "John White",
  },
  {
    img: "/images/home/package2.jpg",
    name: "Rachel Keating", 
  },
  {
    img: "/images/home/package3.jpg",
    name: "Smith Pro",
  },
  {
    img: "/images/home/package1.jpg",
    name: "John White",
  },
  {
    img: "/images/home/package2.jpg",
    name: "Rachel Keating", 
  },
  {
    img: "/images/home/package3.jpg",
    name: "Smith Pro",
  },
];

export default function MemberCTR() {
  return <AllMember data={member} />;
}
