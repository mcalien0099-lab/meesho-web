import React from "react";

export default function Marquee() {
  return (
    <div className="w-full bg-[#970e71] overflow-hidden py-2.5 mt-2">
      <div className="flex whitespace-nowrap animate-[marquee_15s_linear_infinite]">
        {/* We repeat the text multiple times to ensure smooth scrolling */}
        <span className="text-white text-sm font-bold px-4">Buy 2 Get 1 Free (Add 3 item to cart)</span>
        <span className="text-white text-sm font-bold px-4">&nbsp;</span>
        <span className="text-white text-sm font-bold px-4">Buy 2 Get 1 Free (Add 3 item to cart)</span>
        <span className="text-white text-sm font-bold px-4">&nbsp;</span>
        <span className="text-white text-sm font-bold px-4">Buy 2 Get 1 Free (Add 3 item to cart)</span>
        <span className="text-white text-sm font-bold px-4">&nbsp;</span>
        <span className="text-white text-sm font-bold px-4">Buy 2 Get 1 Free (Add 3 item to cart)</span>
      </div>
    </div>
  );
}
