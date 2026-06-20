"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import { HeartIcon, StarIcon } from "../../components/Icons";
import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, wishlist, toggleWishlist, loading } = useAppContext();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!loading && products) {
      const foundProduct = products.find(p => (p.id === id || p._id === id || String(p.id) === id || String(p._id) === id));
      setProduct(foundProduct || null);
    }
  }, [id, products, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 pt-24 md:pt-32">
        <div className="text-gray-500 font-medium">Loading product...</div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-20 pt-24 md:pt-32 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <button onClick={() => router.push("/")} className="btn-primary px-8">Back to Home</button>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlist.has(product.id || product._id);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert("Please select a size first");
      return;
    }
    addToCart(product, selectedSize || "Standard", 1);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert("Please select a size first");
      return;
    }
    addToCart(product, selectedSize || "Standard", 1);
    // Ideally redirect to checkout, but opening cart for now
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[env(safe-area-inset-bottom)] md:pb-20">
      {/* Global Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Top Navigation Bar (Mobile) */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 h-16 flex md:hidden items-center gap-4 shadow-sm">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="font-bold text-lg text-meesho-text-main truncate flex-1">Product Details</h1>
      </div>

      <div className="content-wrapper md:pt-32 pt-4 pb-24 md:pb-12">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => router.push("/")} className="hover:text-meesho-purple transition-colors">Home</button>
          <span>/</span>
          <span className="capitalize hover:text-meesho-purple transition-colors cursor-pointer">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{product.title || product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="w-full md:w-[45%] flex flex-col gap-4">
            <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-gray-200 overflow-hidden relative shadow-sm aspect-[4/5] md:aspect-auto md:h-[600px]">
              <img 
                src={product.image} 
                alt={product.title || product.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <button 
                onClick={() => toggleWishlist(product.id || product._id)}
                className={`absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 z-10 ${isWishlisted ? "text-meesho-pink" : "text-gray-400"}`}
              >
                <HeartIcon filled={isWishlisted} className="w-6 h-6" />
              </button>
            </div>
            
            {/* Action Buttons Desktop */}
            <div className="hidden md:grid grid-cols-2 gap-4 mt-2">
              <button onClick={handleAddToCart} className="btn-secondary py-4 text-base shadow-sm">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn-primary py-4 text-base shadow-sm">
                Buy Now
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-[55%] flex flex-col gap-4">
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
              <h1 className="text-xl md:text-3xl font-medium text-gray-800 mb-3 leading-tight">
                {product.title || product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-sm font-bold text-meesho-green bg-green-50 px-2 py-1 rounded-md border border-green-100">{product.discount}% off</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-meesho-green text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                  {product.rating} <StarIcon filled className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-500">{product.reviewsCount || product.reviews} Ratings</span>
              </div>
              
              <div className="flex items-center gap-2 mt-5 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xl">🚚</span>
                <span className="text-sm font-medium text-gray-700">Free Delivery on this order</span>
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">Select Size</h3>
                  <button className="text-sm font-bold text-meesho-purple">Size Chart</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                        selectedSize === size 
                          ? "border-meesho-purple text-meesho-purple bg-purple-50 ring-4 ring-meesho-purple/10" 
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex"><span className="text-gray-400 w-32 shrink-0">Name:</span> <span className="font-medium text-gray-800">{product.title || product.name}</span></li>
                <li className="flex"><span className="text-gray-400 w-32 shrink-0">Category:</span> <span className="capitalize font-medium text-gray-800">{product.category}</span></li>
                <li className="flex"><span className="text-gray-400 w-32 shrink-0">Pattern:</span> <span className="font-medium text-gray-800">Printed/Solid</span></li>
                <li className="flex"><span className="text-gray-400 w-32 shrink-0">Net Qty:</span> <span className="font-medium text-gray-800">1</span></li>
              </ul>
              
              {product.description && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold mb-2 text-gray-800">Description</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Mobile Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 border-t border-gray-100 bg-white grid grid-cols-2 gap-3 z-40 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button onClick={handleAddToCart} className="btn-secondary py-3.5 shadow-sm border-2">
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="btn-primary py-3.5 shadow-sm">
          Buy Now
        </button>
      </div>

      <CartDrawer />
    </div>
  );
}
