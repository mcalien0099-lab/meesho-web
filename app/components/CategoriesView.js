"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function CategoriesView() {
  const { setCategoryFilter, handleTabChange, categories } = useAppContext();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (categories && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0]._id);
    }
  }, [categories, activeCategory]);

  const handleSubcategoryClick = (catId, subCatName) => {
    // In a real app we might filter by subcategory, but here we filter by category and switch to home
    setCategoryFilter(catId);
    handleTabChange("home");
  };

  if (!categories || categories.length === 0 || !activeCategory) return <div className="flex-1 w-full flex items-center justify-center p-8">Loading categories...</div>;

  const currentCategory = categories.find(c => (c.id === activeCategory || c._id === activeCategory)) || categories[0];

  return (
    <div className="flex-1 w-full flex bg-white md:bg-[#f6f7fb] pt-0 md:pt-6 h-[calc(100vh-68px)] md:h-auto overflow-hidden md:overflow-visible">
      {/* Mobile Sidebar */}
      <div className="w-[85px] md:w-[240px] flex-shrink-0 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto no-scrollbar md:rounded-l-2xl md:shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.id || cat._id}
            onClick={() => setActiveCategory(cat.id || cat._id)}
            className={`w-full flex flex-col md:flex-row items-center md:justify-start gap-2 md:gap-4 p-3 md:p-4 border-b border-gray-200 transition-all ${
              activeCategory === (cat.id || cat._id) 
                ? "bg-white border-l-4 border-l-meesho-purple text-meesho-purple font-bold" 
                : "text-gray-600 hover:bg-gray-100 font-medium border-l-4 border-l-transparent"
            }`}
          >
            <div className={`w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xl md:text-lg shrink-0 ${
              activeCategory === (cat.id || cat._id) ? "bg-purple-50" : "bg-white"
            } border border-gray-200 shadow-sm`}>
              {cat.icon}
            </div>
            <span className="text-[10px] md:text-sm text-center md:text-left leading-tight break-words">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-white md:rounded-r-2xl md:shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-meesho-text-main mb-4">
            {currentCategory.name}
          </h2>
          
          <div className="w-full h-24 md:h-40 rounded-xl overflow-hidden mb-6 relative group cursor-pointer" onClick={() => handleSubcategoryClick(currentCategory.id || currentCategory._id)}>
            <img 
              src={currentCategory.image} 
              alt={currentCategory.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {currentCategory.subcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => handleSubcategoryClick(currentCategory.id || currentCategory._id, sub.name)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:border-meesho-purple group-hover:shadow-md transition-all">
                  <img 
                    src={sub.image} 
                    alt={sub.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] md:text-sm font-medium text-center text-meesho-text-sub group-hover:text-meesho-purple transition-colors">
                  {sub.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
