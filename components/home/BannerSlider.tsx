"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export const BannerSlider: React.FC = () => {
  const slides = [
    {
      id: 1,
      badge: "Welcome to BookNook",
      title: "Discover Your Next Great Literary Journey",
      description:
        "Immerse yourself in thousands of stories, memoirs, and timeless classics curated by passionate book lovers. Add your favorites and borrow with ease.",
      image: "https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Browse Books",
    },
    {
      id: 2,
      badge: "Community Library",
      title: "Share The Joy Of Reading With Fellow Book Lovers",
      description:
        "Have books resting on your home shelves? Add them to BookNook so curious minds in the community can explore, borrow, and cherish them.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Browse Books",
    },
    {
      id: 3,
      badge: "Seamless Borrowing",
      title: "Simple Philosophy: Add, Borrow, Return",
      description:
        "Borrow in one click, set your reading schedule, and return when finished. No hidden hassles—just pure literary enjoyment.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Browse Books",
    },
  ];

  return (
    <section className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        loop
        className="w-full h-[460px] sm:h-[520px] lg:h-[580px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image with Dark Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-900/40" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-2xl px-6 sm:px-12 lg:px-16 text-white space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/30 border border-primary-500/40 backdrop-blur-md text-primary-200 text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
                  {slide.title}
                </h1>

                <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                <div className="pt-2">
                  <Link
                    href="/books"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-lg hover:shadow-primary-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{slide.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
