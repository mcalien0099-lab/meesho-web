"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { HeartIcon, StarIcon } from "./Icons";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useAppContext();
  const router = useRouter();
  
  const isWishlisted = wishlist.has(product.id || product._id);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-meesho-md hover:border-meesho-purple/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => router.push(`/product/${product.id || product._id}`)}
    >
      <div className="product-img-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-card-img"
          loading="lazy"
        />
        
        <button 
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id || product._id);
          }}
        >
          <HeartIcon filled={isWishlisted} className="w-5 h-5" />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-price-row mt-1">
          <span className="product-price">₹{product.price}</span>
          <span className="product-original-price">₹{product.originalPrice}</span>
        </div>
        
        <span className="product-offer">{product.discount}% off</span>
        
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-1.5 py-0.5 rounded mr-2 font-medium">Free Delivery</span>
        </div>
        
        <div className="product-rating-row">
          <div className="rating-badge">
            <span>{product.rating}</span>
            <StarIcon filled className="w-3 h-3" />
          </div>
          <span className="text-xs text-gray-500">{product.reviews} Reviews</span>
        </div>
      </div>
    </div>
  );
}
