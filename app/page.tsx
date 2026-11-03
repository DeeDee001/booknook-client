import React from "react";
import { BannerSlider } from "@/components/home/BannerSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ReaderReviews } from "@/components/home/ReaderReviews";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Hero Swiper.js Slider (min 3 slides) */}
      <BannerSlider />

      {/* 2. New Arrivals (Dynamic: loads latest 6 books from DB) */}
      <NewArrivals />

      {/* 3. Extra Section 1: How Borrowing Works */}
      <HowItWorks />

      {/* 4. Extra Section 2: Reader Reviews & Community Impact */}
      <ReaderReviews />
    </div>
  );
}
