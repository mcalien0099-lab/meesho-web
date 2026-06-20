"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import { HeartIcon, StarIcon } from "../../components/Icons";
import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";
import ProductCard from "../../components/ProductCard";



export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, wishlist, toggleWishlist, loading } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews when product is loaded
  useEffect(() => {
    if (product) {
      const fetchReviews = async () => {
        try {
          const res = await fetch(`https://meesho-backend-vert.vercel.app/api/reviews`);
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setReviews((data.data || []).slice(0, 5));
              console.log(data);
              
            }
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [product]);

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
                <span className="text-base text-gray-400 line-through">₹{product.originalPrice || product.price + 100}</span>
                {(() => {
                  const discount = product.discount || (product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20);
                  return (
                    <span className="text-sm font-bold text-meesho-purple bg-purple-50 px-2 py-1 rounded-md border border-meesho-purple/20">{discount}% off</span>
                  );
                })()}
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-meesho-purple text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
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
                      className={`min-w-[48px] h-12 px-4 rounded-xl text-sm font-bold border-2 transition-all ${selectedSize === size
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

            {/* Description Section */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Description</h3>
              <p className="text-sm text-gray-500 mb-6">Product Specification</p>

              <div className="text-[15px] text-meesho-text-sub space-y-2">
                <p>Name : {product.title || product.name}</p>
                <p>Category : <span className="capitalize">{product.category}</span></p>
                <p>Pattern Type : Printed/Solid</p>
                <p>Net Qty : 1</p>
                {product.description && (
                  <p className="mt-4 whitespace-pre-wrap">{product.description}</p>
                )}
              </div>
            </div>

            {/* Customer Ratings & Reviews */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Customer Ratings & Reviews</h3>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Left Rating Box */}
                <div className="flex flex-col items-center justify-center min-w-[120px]">
                  <div className="bg-meesho-green text-white text-3xl font-bold px-4 py-2 rounded-lg flex items-center gap-1 mb-2 shadow-sm">
                    {product.rating || "4.2"} <StarIcon filled className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">26 ratings</p>
                  <p className="text-[11px] text-gray-500 font-medium">26 reviews</p>
                </div>

                {/* Right Progress Bars */}
                <div className="flex-1 space-y-2">
                  {[
                    { label: "Very Good", percent: 60, count: 6, color: "bg-meesho-green" },
                    { label: "Good", percent: 80, count: 17, color: "bg-meesho-green" },
                    { label: "Ok-Ok", percent: 20, count: 2, color: "bg-orange-400" },
                    { label: "Bad", percent: 0, count: 0, color: "bg-gray-200" },
                    { label: "Very Bad", percent: 0, count: 0, color: "bg-gray-200" },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-16 text-gray-500 text-right">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color}`} style={{ width: `${bar.percent}%` }}></div>
                      </div>
                      <span className="w-4 text-gray-500">{bar.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="border-t border-gray-100 divide-y divide-gray-100 mt-6 pt-2">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id || review.id} className="py-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[13px] font-bold text-gray-800">{review.name || review.userName || "Anonymous"}</span>
                        <div className="flex items-center gap-1 bg-meesho-purple text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {review.rating} <StarIcon filled className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      {/* Using the main product image since individual reviews don't have images in the backend schema */}
                      <img src={product.image} alt="Review" className="w-12 h-12 rounded-lg object-cover mb-2 border border-gray-100" />
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>No reviews yet for this product.</p>
                  </div>
                )}
              </div>

              <button className="w-full mt-4 py-3 border-2 border-meesho-purple text-meesho-purple font-bold text-sm rounded-lg hover:bg-purple-50 transition-colors">
                Show More Reviews (19 More)
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-6xl mx-auto mt-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-around">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-meesho-purple bg-purple-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-[11px] font-bold text-gray-800">Lowest Price</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-meesho-purple bg-purple-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" /><path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" /></svg>
            </div>
            <span className="text-[11px] font-bold text-gray-800">Cash on Delivery</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-meesho-purple bg-purple-50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0014.536-2.628.75.75 0 00-.415-.925z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-[11px] font-bold text-gray-800">7-day Returns</span>
          </div>
        </div>

        {/* Suggestions For You */}
        <div className="max-w-6xl mx-auto mt-8">
          <h2 className="text-xl font-bold text-meesho-purple mb-4">Suggestions For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products?.slice(0, 4).map(p => (
              <ProductCard key={p.id || p._id} product={p} />
            ))}
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
