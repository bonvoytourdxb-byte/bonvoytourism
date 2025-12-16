"use client";
import React from "react";
import AllPackages from "@/components/home/AllPackageComp";

const packages = [
  {
    img: "/images/home/package1.jpg",
    title: "An Asian Temple",
    duration: "5 days",
    reviews: "1 review",
    rating: "★★★★",
    price: "$1200",
  },
  {
    img: "/images/home/package2.jpg",
    title: "European Adventure",
    duration: "7 days",
    reviews: "3 reviews",
    rating: "★★★★★",
    price: "$1500",
  },
  {
    img: "/images/home/package3.jpg",
    title: "Desert Safari",
    duration: "3 days",
    reviews: "5 reviews",
    rating: "★★★★☆",
    price: "$900",
  },
  {
    img: "/images/home/package4.jpg",
    title: "Beach Paradise",
    duration: "6 days",
    reviews: "8 reviews",
    rating: "★★★★★",
    price: "$2000",
  },
  {
    img: "/images/home/package1.jpg",
    title: "An Asian Temple",
    duration: "5 days",
    reviews: "1 review",
    rating: "★★★★",
    price: "$1200",
  },
  {
    img: "/images/home/package2.jpg",
    title: "European Adventure",
    duration: "7 days",
    reviews: "3 reviews",
    rating: "★★★★★",
    price: "$1500",
  },
  {
    img: "/images/home/package3.jpg",
    title: "Desert Safari",
    duration: "3 days",
    reviews: "5 reviews",
    rating: "★★★★☆",
    price: "$900",
  },
  {
    img: "/images/home/package4.jpg",
    title: "Beach Paradise",
    duration: "6 days",
    reviews: "8 reviews",
    rating: "★★★★★",
    price: "$2000",
  },
];

export default function AllPackagesCTR() {
  return <AllPackages data={packages} />;
}
