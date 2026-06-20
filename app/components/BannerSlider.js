"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function BannerSlider() {
  const { banners } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !banners || banners.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered, banners]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (!banners || banners.length === 0) return <div className="w-full h-[180px] md:h-[280px] mt-4 md:mt-6 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">Loading banners...</div>;

  return (
    <div 
      className="relative w-full h-[180px] md:h-[280px] mt-4 md:mt-6 rounded-xl md:rounded-2xl overflow-hidden shadow-meesho-md group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner.id || banner._id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
              isActive ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-12 scale-95 z-0"
            }`}
          >
            {banner.image && (
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white bg-gradient-to-r from-black/60 via-black/30 to-transparent">
              <h2 className="text-xl md:text-4xl font-extrabold tracking-tight mb-2 md:mb-3 drop-shadow-md">
                {banner.title}
              </h2>
              <p className="text-xs md:text-base opacity-90 mb-4 md:mb-6 max-w-[70%] md:max-w-md drop-shadow-sm">
                {banner.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-4 md:px-6 py-1.5 md:py-2.5 rounded-md md:rounded-lg text-xs md:text-sm font-bold w-fit shadow-md transition-transform hover:scale-105 active:scale-95">
                {banner.buttonText || banner.cta || "Shop Now"}
              </button>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg hover:bg-white hover:scale-110 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg hover:bg-white hover:scale-110 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
