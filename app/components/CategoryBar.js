"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";

export default function CategoryBar() {
  const { handleTabChange, filters, setCategoryFilter, categories } = useAppContext();

  // Handle empty state while loading
  if (!categories || categories.length === 0) return null;

  return (
    <>
      {/* Desktop Category Menu Bar */}
      <div className="hidden md:block w-full border-b border-meesho-border bg-white sticky top-[68px] z-40">
        <div className="content-wrapper flex items-center justify-between py-3">
          {[
            "Women Ethnic", 
            "Women Western", 
            "Men", 
            "Kids", 
            "Home & Kitchen", 
            "Beauty & Health", 
            "Jewellery & Accessories", 
            "Bags & Footwear", 
            "Electronics"
          ].map((catName) => (
            <button
              key={catName}
              onClick={() => {
                handleTabChange("categories");
                // Find matching category from API if exists, otherwise fallback
                const matched = categories.find(c => c.name.toLowerCase().includes(catName.split(" ")[0].toLowerCase()));
                if (matched) setCategoryFilter(matched.id || matched._id);
              }}
              className="text-[15px] font-medium transition-colors hover:text-meesho-purple pb-1 border-b-2 border-transparent text-meesho-text-main"
            >
              {catName}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Category Circles */}
      <div className="md:hidden flex items-center gap-4 overflow-x-auto px-4 py-4 bg-white border-b-4 border-gray-100 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id || cat._id}
            onClick={() => {
              handleTabChange("categories");
              setCategoryFilter(cat.id || cat._id);
            }}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className={`w-14 h-14 rounded-full border bg-gray-50 flex items-center justify-center text-2xl transition-all ${
              filters.category === (cat.id || cat._id) ? "border-meesho-purple shadow-sm ring-2 ring-meesho-purple/20" : "border-meesho-border"
            }`}>
              {cat.icon}
            </div>
            <span className={`text-[11px] whitespace-nowrap ${filters.category === (cat.id || cat._id) ? "font-bold text-meesho-purple" : "font-medium text-meesho-text-main"}`}>
              {cat.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
