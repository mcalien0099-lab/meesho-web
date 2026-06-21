"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/AppContext";
import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, wishlist, toggleWishlist, loading } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!loading && products) {
      const foundProduct = products.find(p => (p.id === id || p._id === id || String(p.id) === id || String(p._id) === id));
      setProduct(foundProduct || null);
    }
  }, [id, products, loading]);

  useEffect(() => {
    if (product) {
      const fetchReviews = async () => {
        try {
          const res = await fetch(`https://meesho-backend-vert.vercel.app/api/reviews`);
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setReviews((data.data || []).slice(0, 5));
            }
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading product...</div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <button onClick={() => router.push("/")} className="btn-primary px-8">Back to Home</button>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlist.has(product.id || product._id);
  const originalPrice = product.originalPrice || product.price + 100;
  const discount = product.discount || (originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 20);

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
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-[80px]">
      {/* Mobile Top Header */}
      <div className="bg-white sticky top-0 z-50 flex items-center justify-between px-3 py-2 border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center cursor-pointer mr-2">
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
              <path d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z" fill="#666666"></path>
            </svg>
          </button>
          <button onClick={() => router.push("/")} className="cursor-pointer">
            <svg viewBox="0 0 156 36" fill="none" xmlns="http://www.w3.org/2000/svg" height="25" width="90">
              <g clipPath="url(#meeshoLogo_svg__a)">
                <path fill="#fff" d="M0 0h156v36H0z"></path>
                <path d="M56.307 23.698c.38-.29.568-.707.568-1.253 0-1.731-.237-3.288-.707-4.675-.47-1.383-1.154-2.56-2.053-3.535a8.967 8.967 0 0 0-3.235-2.232c-1.262-.515-2.685-.774-4.264-.774-2.157 0-4.08.492-5.767 1.48-1.687.99-3.007 2.35-3.969 4.08-.957 1.732-1.436 3.755-1.436 6.063 0 2.372.492 4.42 1.481 6.157.989 1.731 2.394 3.069 4.22 4.013 1.825.944 3.995 1.414 6.518 1.414 1.186 0 2.47-.161 3.852-.479 1.383-.318 2.604-.814 3.669-1.48.546-.336.935-.73 1.163-1.186.228-.457.313-.904.25-1.347a2.007 2.007 0 0 0-.523-1.119c-.29-.304-.675-.478-1.163-.523-.488-.045-1.047.112-1.687.479a9.65 9.65 0 0 1-2.805 1.024c-.989.197-1.88.295-2.667.295-2.281 0-4.004-.613-5.176-1.847-.926-.976-1.481-2.358-1.673-4.125h13.78c.707 0 1.244-.144 1.624-.43Zm-12.72-7.705c.895-.595 1.982-.89 3.262-.89 1.154 0 2.12.25 2.894.752.774.5 1.37 1.226 1.777 2.165.34.783.532 1.732.59 2.828H40.93c.107-.864.304-1.655.603-2.349.475-1.078 1.16-1.915 2.054-2.505ZM81.13 23.698c.38-.29.568-.707.568-1.253 0-1.731-.237-3.288-.707-4.675-.47-1.383-1.154-2.56-2.054-3.535a8.966 8.966 0 0 0-3.234-2.232c-1.262-.515-2.685-.774-4.264-.774-2.157 0-4.08.492-5.767 1.48-1.687.99-3.007 2.35-3.969 4.08-.957 1.732-1.436 3.755-1.436 6.063 0 2.372.492 4.42 1.48 6.157.99 1.731 2.394 3.069 4.22 4.013 1.825.944 3.995 1.414 6.519 1.414 1.185 0 2.47-.161 3.852-.479 1.383-.318 2.604-.814 3.669-1.48.546-.336.935-.73 1.163-1.186.228-.457.313-.904.25-1.347a2.008 2.008 0 0 0-.523-1.119c-.29-.304-.675-.478-1.163-.523-.488-.045-1.047.112-1.687.479a9.65 9.65 0 0 1-2.805 1.024c-.989.197-1.88.295-2.667.295-2.282 0-4.004-.613-5.176-1.847-.931-.976-1.481-2.358-1.674-4.125h13.78c.703 0 1.245-.144 1.625-.43Zm-12.72-7.705c.895-.595 1.982-.89 3.261-.89 1.155 0 2.121.25 2.895.752.774.5 1.37 1.226 1.776 2.165.34.783.533 1.732.591 2.828h-11.18c.106-.864.303-1.655.603-2.349.47-1.078 1.154-1.915 2.054-2.505ZM97.993 21.394l-4.559-.868c-.881-.152-1.535-.438-1.96-.868-.425-.425-.64-.957-.64-1.597 0-.85.358-1.535 1.07-2.054.716-.514 1.816-.774 3.306-.774.792 0 1.62.108 2.483.318.868.215 1.772.564 2.712 1.047.514.241.98.326 1.391.25a1.71 1.71 0 0 0 1.025-.595 2.47 2.47 0 0 0 .546-1.096 1.975 1.975 0 0 0-.112-1.208c-.166-.394-.479-.716-.935-.957a13.835 13.835 0 0 0-3.396-1.347c-1.173-.29-2.425-.434-3.763-.434-1.852 0-3.494.29-4.926.868-1.427.577-2.546 1.4-3.351 2.46-.805 1.066-1.208 2.327-1.208 3.786 0 1.61.492 2.926 1.48 3.942.99 1.02 2.426 1.709 4.31 2.076l4.559.867c.94.184 1.646.466 2.12.842.47.38.707.921.707 1.62 0 .818-.358 1.48-1.07 1.981-.715.501-1.798.752-3.26.752-1.034 0-2.081-.112-3.146-.34-1.065-.228-2.206-.63-3.418-1.208-.488-.242-.936-.318-1.347-.228-.412.09-.747.29-1.002.59-.26.305-.412.662-.457 1.074a2.24 2.24 0 0 0 .228 1.23c.197.412.542.77 1.025 1.07 1.154.671 2.46 1.14 3.92 1.414 1.458.273 2.84.411 4.147.411 2.886 0 5.199-.63 6.93-1.892 1.732-1.262 2.6-3.002 2.6-5.222 0-1.642-.51-2.948-1.526-3.919-1.011-.957-2.51-1.624-4.483-1.99ZM125.603 12.32c-1.155-.666-2.631-1.002-4.421-1.002-1.794 0-3.396.416-4.81 1.253a7.254 7.254 0 0 0-2.483 2.443V4.437c0-.944-.25-1.656-.751-2.143-.501-.488-1.208-.73-2.121-.73s-1.611.242-2.099.73c-.487.487-.729 1.199-.729 2.143v27.082c0 .944.242 1.664.729 2.165.488.501 1.186.752 2.099.752 1.915 0 2.872-.97 2.872-2.917v-9.986c0-1.732.492-3.123 1.481-4.17.989-1.047 2.318-1.575 3.991-1.575 1.369 0 2.38.393 3.034 1.185.653.792.979 2.054.979 3.786v10.76c0 .944.251 1.664.752 2.165.501.501 1.208.752 2.121.752s1.611-.25 2.098-.752c.488-.5.729-1.221.729-2.165V20.486c0-2.067-.29-3.777-.867-5.128-.582-1.355-1.446-2.367-2.604-3.038ZM150.618 12.642c-1.7-.944-3.709-1.413-6.018-1.413-1.731 0-3.297.268-4.698.796-1.396.532-2.599 1.306-3.601 2.326-1.003 1.02-1.772 2.233-2.305 3.647-.532 1.414-.796 3.015-.796 4.81 0 2.37.47 4.429 1.414 6.178.939 1.75 2.264 3.092 3.968 4.036 1.701.944 3.709 1.414 6.018 1.414 1.732 0 3.297-.269 4.698-.797 1.396-.532 2.599-1.306 3.602-2.326 1.002-1.02 1.771-2.242 2.304-3.669.532-1.427.796-3.038.796-4.832 0-2.371-.47-4.42-1.414-6.156-.944-1.736-2.264-3.074-3.968-4.014Zm-1.07 14.201c-.469 1.079-1.132 1.893-1.982 2.439-.85.546-1.838.818-2.961.818-1.701 0-3.07-.613-4.103-1.847-1.034-1.23-1.548-3.047-1.548-5.45 0-1.61.237-2.957.707-4.036.469-1.078 1.132-1.883 1.982-2.416.85-.532 1.839-.796 2.962-.796 1.7 0 3.069.6 4.102 1.799 1.034 1.199 1.548 3.015 1.548 5.45 0 1.614-.237 2.961-.707 4.04ZM15.512 34.431c-1.387 0-2.555-1.167-2.555-2.554V20.18c.013-2.165-1.79-3.915-3.924-3.879-2.134-.036-3.932 1.718-3.924 3.88v11.695a2.557 2.557 0 0 1-2.554 2.554C1.18 34.431 0 33.246 0 31.877V20.22a8.993 8.993 0 0 1 2.649-6.389 8.998 8.998 0 0 1 6.384-2.648 9.012 9.012 0 0 1 6.483 2.742A8.997 8.997 0 0 1 22 11.184a8.982 8.982 0 0 1 6.385 2.648 9.008 9.008 0 0 1 2.649 6.39v11.654c0 1.37-1.181 2.555-2.555 2.555a2.557 2.557 0 0 1-2.555-2.554V20.18c.014-2.165-1.79-3.915-3.924-3.879-2.134-.036-3.932 1.718-3.923 3.88v11.695c-.01 1.387-1.177 2.554-2.564 2.554Z" fill="#570D48"></path>
              </g>
              <defs>
                <clipPath id="meeshoLogo_svg__a"><rect width="100%" height="100%" fill="#fff"></rect></clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4 mr-2">
          <button className="relative flex items-center justify-center cursor-pointer">
            <svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
              <path d="M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z" fill="#ED3843"></path>
            </svg>
          </button>
          <button className="relative flex items-center justify-center cursor-pointer">
            <svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
              <g clipPath="url(#cart-header_svg__a)">
                <g clipPath="url(#cart-header_svg__b)">
                  <g clipPath="url(#cart-header_svg__c)">
                    <path d="M6.003 5.183h15.139c.508 0 .908.49.85 1.046l-.762 7.334c-.069.62-.537 1.1-1.103 1.121l-12.074.492-2.05-9.993Z" fill="#C53EAD"></path>
                    <path d="M11.8 21.367c.675 0 1.22-.597 1.22-1.334 0-.737-.545-1.335-1.22-1.335-.673 0-1.22.598-1.22 1.335s.547 1.334 1.22 1.334ZM16.788 21.367c.674 0 1.22-.597 1.22-1.334 0-.737-.546-1.335-1.22-1.335-.673 0-1.22.598-1.22 1.335s.547 1.334 1.22 1.334Z" fill="#9F2089"></path>
                    <path d="m2.733 4.169 3.026 1.42 2.528 12.085c.127.609.615 1.036 1.181 1.036h9.615" stroke="#9F2089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="cart-header_svg__a"><path fill="#fff" transform="translate(2.001 1.368)" d="M0 0h20v20H0z"></path></clipPath>
                <clipPath id="cart-header_svg__b"><path fill="#fff" transform="translate(2.001 1.368)" d="M0 0h20v20H0z"></path></clipPath>
                <clipPath id="cart-header_svg__c"><path fill="#fff" transform="translate(2.001 3.368)" d="M0 0h20v18H0z"></path></clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full bg-white max-w-[600px] mx-auto pb-4">
        {/* Constrained width/height image */}
        <div className="w-full relative aspect-[4/5] max-h-[500px] bg-gray-50 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
        </div>

        {/* Title & Actions */}
        <div className="px-4 mt-5 flex justify-between items-start">
          <div className="text-[17px] font-bold text-gray-600 uppercase pr-4">{product.title || product.name}</div>
          <div className="flex gap-4 flex-shrink-0 mt-1">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => toggleWishlist(product.id || product._id)}>
              <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
                {isWishlisted ? (
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="#f43397"></path>
                ) : (
                  <>
                    <g clipPath="url(#wishlist-product_svg__a)">
                      <path d="M4.616 2.048c.856 0 1.672.384 2.416 1.144a1.35 1.35 0 0 0 1.936 0c.744-.76 1.56-1.136 2.416-1.136 1.28 0 2.52.888 3.08 2.2.584 1.376.264 2.856-.888 4.056L8.336 13.8a.478.478 0 0 1-.336.152.447.447 0 0 1-.336-.152l-5.24-5.488C1.272 7.104.952 5.624 1.536 4.248c.56-1.312 1.8-2.2 3.08-2.2Zm0-1.248c-3.584 0-6.52 4.784-3.088 8.376l5.24 5.488c.336.36.784.536 1.232.536.448 0 .896-.176 1.232-.536l5.24-5.488C17.896 5.592 14.96.8 11.376.8c-1.096 0-2.248.448-3.296 1.512a.103.103 0 0 1-.08.032.103.103 0 0 1-.08-.032C6.872 1.248 5.712.8 4.616.8Z" fill="#333"></path>
                    </g>
                    <defs>
                      <clipPath id="wishlist-product_svg__a"><path fill="#fff" transform="translate(0 .8)" d="M0 0h16v14.4H0z"></path></clipPath>
                    </defs>
                  </>
                )}
              </svg>
              <span className="text-[12px] text-gray-500">Wishlist</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
              <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
                <path fill="#fff" d="M.947.979h16v16h-16z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.489 3.912c0-1.62 1.266-2.933 2.829-2.933 1.562 0 2.828 1.313 2.828 2.933 0 1.62-1.266 2.933-2.828 2.933a2.784 2.784 0 0 1-2.175-1.057L7.071 8.303a3.007 3.007 0 0 1 .295 1.866l3.643 2.18a2.797 2.797 0 0 1 2.309-1.238c1.562 0 2.828 1.314 2.828 2.934s-1.266 2.933-2.828 2.933c-1.563 0-2.829-1.313-2.829-2.933 0-.172.014-.34.042-.504l-3.636-2.176a2.798 2.798 0 0 1-2.32 1.254c-1.562 0-2.828-1.314-2.828-2.934s1.266-2.933 2.828-2.933a2.75 2.75 0 0 1 1.674.568l4.33-2.673a3.042 3.042 0 0 1-.09-.735Zm4.423 0c0-.914-.714-1.654-1.594-1.654-.88 0-1.595.74-1.595 1.653s.714 1.654 1.595 1.654c.88 0 1.594-.74 1.594-1.654ZM6.17 9.684c0-.913-.714-1.653-1.595-1.653-.88 0-1.594.74-1.594 1.653s.714 1.653 1.594 1.653c.88 0 1.595-.74 1.595-1.653Zm7.148 2.706c.88 0 1.594.74 1.594 1.653s-.714 1.654-1.594 1.654c-.88 0-1.595-.74-1.595-1.654 0-.913.714-1.653 1.595-1.653Z" fill="#353543"></path>
              </svg>
              <span className="text-[12px] text-gray-500">Share</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="px-4 my-2 flex items-end gap-2">
          <span className="text-[26px] font-bold text-gray-800 leading-none">₹{product.price}</span>
          <span className="text-[16px] text-gray-400 line-through leading-none pb-0.5">₹{originalPrice}</span>
          <span className="text-[16px] text-gray-600 leading-none pb-0.5 ml-1">{discount}% off</span>
        </div>

        {/* Offers */}
        <div className="px-4 mt-3">
          <div className="inline-flex items-center bg-[#e6f7f4] px-2.5 py-1 rounded-full gap-2">
            <span className="text-[13px] font-bold text-[#038D63]">₹{product.price - 20} with 2 Special Offers</span>
            <svg width="16" height="16" fill="#91E5BD" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <rect width="16" height="16" rx="8"></rect>
              <path d="M6.387 4.59a.647.647 0 0 0 0 .908L8.86 8l-2.474 2.502a.647.647 0 0 0 0 .91.63.63 0 0 0 .899 0l2.927-2.96a.647.647 0 0 0 0-.91l-2.927-2.96a.636.636 0 0 0-.9.007Z" fill="#038D63"></path>
            </svg>
          </div>
        </div>

        {/* Ratings Summary Row */}
        <div className="px-4 mt-4 flex items-center gap-2">
          <div className="bg-[#038D63] text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-[15px] font-bold">
            {product.rating || "4.1"}
            <svg width="13" height="12" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z" fill="white"></path>
            </svg>
          </div>
          <span className="text-[13px] text-gray-500 font-medium">{product.reviews || 8204} ratings and 2992 reviews &bull;</span>
          <svg width="55" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M9.901 5.496a2 2 0 0 1 2-2h41.6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-41.6a2 2 0 0 1-2-2v-9Z" fill="#FFE7FB"></path>
            <path d="M24.712 6H19.5v1.03h2.052v5.843h1.12V7.03h2.041V6ZM24.698 8.229v4.644h1.06v-2.17c0-1.09.52-1.532 1.228-1.532a.95.95 0 0 1 .353.06V8.198a.85.85 0 0 0-.363-.068c-.55 0-1.031.314-1.267.844h-.02v-.746h-.991ZM32.226 12.873V8.229h-1.07v2.67c0 .697-.481 1.188-1.09 1.188-.56 0-.884-.383-.884-1.1V8.23h-1.06v2.975c0 1.129.628 1.816 1.63 1.816.658 0 1.188-.314 1.443-.766h.05v.619h.981ZM35.25 13.02c1.1 0 1.846-.59 1.846-1.532 0-1.855-2.543-1.03-2.543-2.052 0-.304.236-.55.698-.55.422 0 .765.246.814.59l.992-.207c-.167-.706-.893-1.188-1.836-1.188-1.03 0-1.728.57-1.728 1.434 0 1.856 2.543 1.03 2.543 2.052 0 .393-.265.658-.756.658-.481 0-.874-.255-.992-.668l-.972.197c.226.795.943 1.266 1.934 1.266ZM40.083 12.97c.343 0 .638-.058.795-.136l-.118-.855a.992.992 0 0 1-.471.099c-.501 0-.747-.226-.747-.914V9.132h1.287v-.903h-1.287V6.746l-1.07.206V8.23h-.844v.903h.844v2.21c0 1.207.658 1.629 1.61 1.629ZM45.823 11.744l-.894-.265c-.206.422-.589.657-1.09.657-.746 0-1.256-.53-1.355-1.305h3.525v-.265c-.02-1.6-1.03-2.485-2.297-2.485-1.365 0-2.308 1.07-2.308 2.485 0 1.403.992 2.454 2.425 2.454.933 0 1.61-.442 1.994-1.276ZM43.73 8.906c.6 0 1.12.373 1.169 1.198h-2.406c.118-.766.56-1.198 1.237-1.198ZM46.776 10.556c0 1.463.923 2.464 2.17 2.464.619 0 1.237-.255 1.542-.854h.03v.707h.981V6h-1.07v2.828c-.246-.432-.766-.747-1.463-.747-1.247 0-2.19.992-2.19 2.475Zm1.07 0c0-.874.501-1.542 1.316-1.542.805 0 1.296.638 1.296 1.542 0 .893-.49 1.522-1.296 1.522-.795 0-1.315-.648-1.315-1.522Z" fill="#9F2089"></path>
            <path d="M16.5 3.239 9.027.059a.746.746 0 0 0-.585 0L.969 3.24a.782.782 0 0 0-.47.721v6.36c0 5.321 3.139 7.611 7.947 9.622a.746.746 0 0 0 .576 0c4.809-2.01 7.948-4.3 7.948-9.622V3.96c0-.316-.186-.6-.47-.721Z" fill="#FFE7FB"></path>
            <path d="m15.748 3.894-6.75-2.871a.673.673 0 0 0-.528 0l-6.75 2.87a.706.706 0 0 0-.424.652v5.745c0 4.806 2.835 6.874 7.178 8.69.167.07.353.07.52 0 4.343-1.816 7.178-3.884 7.178-8.69V4.545a.706.706 0 0 0-.424-.651Z" fill="#60014A"></path>
            <path d="M10.852 6.455c.804.006 1.482.28 2.04.817.565.54.843 1.185.837 1.946l-.023 3.58c-.003.426-.37.77-.824.77-.45-.003-.814-.35-.81-.777l.022-3.58a1.098 1.098 0 0 0-.367-.85 1.216 1.216 0 0 0-.885-.35 1.247 1.247 0 0 0-.921.372c-.23.227-.344.54-.347.856l-.02 3.528c-.003.432-.376.782-.833.78-.458-.004-.828-.357-.824-.79l.022-3.548c.004-.31-.11-.617-.334-.844a1.254 1.254 0 0 0-.918-.378 1.253 1.253 0 0 0-.892.34c-.24.23-.37.513-.37.845l-.022 3.576c-.004.43-.373.777-.827.774-.455-.003-.818-.353-.815-.783l.023-3.564c.003-.66.25-1.308.714-1.799.6-.632 1.34-.948 2.199-.942.82.006 1.521.285 2.082.853.578-.565 1.272-.835 2.093-.832Z" fill="#FF9D00"></path>
          </svg>
        </div>

        {/* Free Delivery */}
        <div className="px-4 mt-4">
          <span className="text-[13px] font-medium text-gray-700 bg-[#f0f0f5] px-2 py-1 rounded-full">Free Delivery</span>
        </div>
      </div>

      {/* Select Size Block */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="w-full bg-white max-w-[600px] mx-auto mt-2 p-4">
          <h6 className="text-[17px] font-bold text-[#333333] mb-4">Select Size</h6>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <span
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex items-center justify-center min-w-[50px] h-[34px] px-3 rounded-[20px] text-[14px] font-bold cursor-pointer transition-all ${selectedSize === size
                    ? "text-[#9f2089] border border-[#9f2089] bg-white"
                    : "text-[#333333] border border-[#333333] bg-white"
                  }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Details Block */}
      <div className="w-full bg-white max-w-[600px] mx-auto mt-2 p-4">
        <h6 className="text-[17px] font-bold text-[#333333] mb-4">Product Details</h6>
        <div className="text-[13px] text-[#333333] space-y-4">
          <ul className="list-disc pl-6 space-y-1">
            <li>PRODUCT DISCRIPTION</li>
            <li>100% Original Products</li>
            <li>Free Delivery on order</li>
            <li>Pay on delivery might be available</li>
            <li>Easy 7 days returns</li>
            <li>This item is only returnable and not exchangeable</li>
          </ul>

          <p><span className="underline">SPECIFICATIONS</span></p>

          <div className="space-y-4 pt-1">
            <div><span className="underline">Fabric</span>: Exclusive 100% Pure American Crepe ethnic Kurti for Women conveys a statement of luxury with comfort with its easy-to-carry 100% pure American Crepe fabric.</div>
            <div><span className="underline">Features</span>: Digital Printed and embroidery work. Disigner And multicolored Kurta. Our Kurta's Design is Very attractive. new different Style And Multicolor Kurti, making it a captivating style statement.</div>
            <div><span className="underline">Fitting</span>: This Amarican Crepe Ethnic Kurti is a Regular fit according to the Size. It is breathable and comfortable to wear all day long.</div>
            <div><span className="underline">Style</span> : It is Round-Shaped Neck on the Backside of the kurti. it has 3/4th length sleeves, A Classic Straight Kurti.</div>
            <div><span className="underline">Occasion</span> : Making It both ethanic and stylish, it provides comfort all day while maintaining style.</div>
          </div>
        </div>
      </div>

      {/* Product Ratings & Reviews Block */}
      <div className="w-full bg-white max-w-[600px] mx-auto mt-2 pt-4">
        <div className="px-4 border-b border-gray-200 pb-4">
          <h6 className="text-[17px] font-bold text-[#333333] mb-6">Product Ratings & Reviews</h6>

          {/* Rating Summary Map */}
          <div className="flex gap-4">
            <div className="flex flex-col pr-4 justify-center">
              <div className="flex items-center gap-1.5 mb-2">
                <h1 className="text-[38px] font-bold text-[#038D63] leading-none">{product.rating || "4.0"}</h1>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#038D63" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                  <path d="M19.54 6.85 13.62 5.5 10.51.29a.596.596 0 0 0-1.02 0L6.38 5.5.46 6.85a.599.599 0 0 0-.31.98l3.99 4.57-.55 6.04c-.02.21.07.41.24.54.17.12.39.15.59.07L10 16.64l5.58 2.39c.08.03.16.05.23.05h.01c.3.01.6-.26.6-.6 0-.06-.01-.12-.03-.17l-.54-5.93 3.99-4.57c.14-.16.18-.38.12-.58a.544.544 0 0 0-.42-.38Z" fill="#038D63"></path>
                </svg>
              </div>
              <div className="text-[11px] text-gray-500 flex flex-col gap-1">
                <span>{product.reviews || 9714} Ratings,</span>
                <span>2118 Reviews</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1.5 text-[11px] text-[#333333] font-medium justify-center">
              {[
                { label: "Excellent", meter: "w-[80%] bg-[#038D63]", count: 1461 },
                { label: "Very Good", meter: "w-[40%] bg-[#038D63]", count: 408 },
                { label: "Good", meter: "w-[20%] bg-[#F4B41A]", count: 849 },
                { label: "Average", meter: "w-[5%] bg-[#F05542]", count: 428 },
                { label: "Poor", meter: "w-[10%] bg-[#F05542]", count: 383 },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-[60px] text-right text-gray-700">{row.label}</span>
                  <div className="flex-1 h-[3px] bg-[#f0f0f5] rounded-full overflow-hidden">
                    <div className={`h-full ${row.meter} rounded-full`}></div>
                  </div>
                  <span className="w-8 text-right text-gray-700">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real Images Section */}
        <div className="px-4 py-4 border-b border-gray-200">
          <h6 className="text-[13px] font-bold text-[#333333] mb-3">Real Images and videos from customers</h6>
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {/* Reduced number of images as requested */}
            {[...Array(3)].map((_, i) => (
              <img key={i} src={product.image} alt="Customer Image" className="w-[60px] h-[60px] object-cover flex-shrink-0 rounded" />
            ))}
          </div>
        </div>

        {/* API Reviews List */}
        <div className="px-4">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => {
              const reviewDate = review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
                : "Posted recently";

              return (
                <div key={review._id || idx} className="py-5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e5e5e5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#D3DCE6" />
                    </svg>
                    <span className="text-[13px] text-gray-600 font-medium">{review.name || review.userName || "Customer"}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#038D63] text-white px-2 py-[2px] rounded-full flex items-center gap-1 text-[11px] font-bold">
                      {review.rating || 5}
                      <svg width="8" height="8" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z" fill="white"></path>
                      </svg>
                    </div>
                    <span className="text-[12px] text-gray-500">{reviewDate}</span>
                  </div>

                  <p className="text-[14px] text-[#333333] mb-3">{review.comment}</p>

                  <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
                    {/* Map actual review images if they exist, else show just 1 placeholder */}
                    {review.images && review.images.length > 0 ? (
                      review.images.map((img, i) => (
                        <img key={i} src={img} alt="Review Image" className="w-[60px] h-[60px] object-cover flex-shrink-0 rounded" />
                      ))
                    ) : (
                      <img src={product.image} alt="Review Image" className="w-[60px] h-[60px] object-cover flex-shrink-0 rounded" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#888" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                    </svg>
                    <span className="text-[12px]">Helpful (883)</span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-4 text-gray-500 text-sm">No reviews found.</div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 p-2 flex gap-2">
        <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 border border-[#9f2089] text-[#9f2089] bg-white rounded py-3 font-bold text-[15px]">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.003 5.183h15.139c.508 0 .908.49.85 1.046l-.762 7.334c-.069.62-.537 1.1-1.103 1.121l-12.074.492-2.05-9.993Z" fill="#C53EAD"></path>
            <path d="M11.8 21.367c.675 0 1.22-.597 1.22-1.334 0-.737-.545-1.335-1.22-1.335-.673 0-1.22.598-1.22 1.335s.547 1.334 1.22 1.334ZM16.788 21.367c.674 0 1.22-.597 1.22-1.334 0-.737-.546-1.335-1.22-1.335-.673 0-1.22.598-1.22 1.335s.547 1.334 1.22 1.334Z" fill="#9F2089"></path>
            <path d="m2.733 4.169 3.026 1.42 2.528 12.085c.127.609.615 1.036 1.181 1.036h9.615" stroke="#9F2089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="flex-1 flex items-center justify-center gap-2 bg-[#9f2089] text-white rounded py-3 font-bold text-[15px]">
          <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.825 0H6.261L.175 10.368h4.565L3.175 18l10.65-10.368H9.261L13.825 0h-3z" fill="#fff"></path>
          </svg>
          Buy Now
        </button>
      </div>

      <CartDrawer />
    </div>
  );
}
