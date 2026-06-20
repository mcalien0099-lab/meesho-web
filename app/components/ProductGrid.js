"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { filteredProducts, searchQuery } = useAppContext();

  return (
    <div className="flex-1 w-full">
      <div className="bg-white px-4 py-3 md:px-0 md:py-0 md:bg-transparent md:mb-4 flex items-center justify-between sticky top-[132px] md:static z-20 md:z-auto border-b md:border-none border-gray-100">
        <h2 className="text-lg md:text-2xl font-bold text-meesho-text-main">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Products For You"}
        </h2>
        <span className="text-sm text-gray-500 font-medium">
          {filteredProducts.length} Products
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-lg border border-gray-100 min-h-[300px]">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-meesho-text-main mb-2">No Products Found</h3>
          <p className="text-gray-500 text-sm max-w-sm">
            We couldn't find any products matching your search or filters. Try adjusting them to see more results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] md:gap-4 bg-gray-200 md:bg-transparent">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
