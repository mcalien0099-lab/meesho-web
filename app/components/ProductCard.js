"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { HeartIcon } from "./Icons";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useAppContext();
  const router = useRouter();
  
  const isWishlisted = wishlist.has(product.id || product._id);
  const originalPrice = product.originalPrice || product.price + 100;
  const discount = product.discount || (originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 20);

  const idStr = String(product.id || product._id || "123");
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
    hash |= 0;
  }
  const variance = Math.abs(hash) + product.price;
  const numOffers = (variance % 3) + 1;
  const discountAmount = 15 + (variance % 35);
  const orderNowDiscount = Math.floor(discount * 1.5) + (variance % 25);

  return (
    <div 
      className="group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer flex flex-col h-full"
      onClick={() => router.push(`/product/${product.id || product._id}`)}
    >
      <div className="relative w-full pt-[130%] bg-gray-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
        
        <button 
          className={`absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 z-10 shadow-sm border border-gray-100 transition-all duration-300 hover:bg-white active:scale-95 ${isWishlisted ? "text-meesho-pink bg-pink-50 border-pink-200" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id || product._id);
          }}
        >
          <HeartIcon filled={isWishlisted} className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col p-2.5">
        <h3 className="text-gray-500 text-[13px] md:text-sm font-medium line-clamp-1 mb-1">{product.title}</h3>
        
        <div className="flex items-end gap-1 mb-1">
          <span className="text-gray-900 text-lg md:text-xl font-bold leading-none">₹{product.price}</span>
          <span className="text-gray-400 text-xs md:text-sm line-through leading-none mb-0.5">₹{originalPrice}</span>
          <span className="text-[#038D63] text-xs font-bold leading-none mb-0.5 ml-1">{discount}% off</span>
        </div>

        <div className="flex flex-col gap-1 my-1">
          <div className="inline-flex items-center">
            <span className="bg-[#f0f9f4] text-[#038D63] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              ₹{product.price - discountAmount} with {numOffers} Special Offer{numOffers > 1 ? 's' : ''}
            </span>
          </div>
          <div className="inline-flex items-center bg-[#f0f9f4] text-[#038D63] px-1.5 py-0.5 rounded-sm w-fit">
            <svg viewBox="0 0 12 12" fill="#038D63" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.86 6.448a.795.795 0 0 0 .003-.895l-.726-1.051A.79.79 0 0 1 11 4.057l-.006-1.294a.764.764 0 0 0-.505-.725l-1.175-.404a.747.747 0 0 1-.365-.276L8.22.314a.718.718 0 0 0-.817-.277l-1.18.396a.7.7 0 0 1-.449 0L4.597.037a.717.717 0 0 0-.817.277l-.731 1.044a.728.728 0 0 1-.363.276l-1.177.404a.761.761 0 0 0-.503.725L1 4.057a.79.79 0 0 1-.137.445l-.726 1.05a.8.8 0 0 0 0 .896l.726 1.05A.79.79 0 0 1 1 7.943l.006 1.294c0 .33.203.622.503.725l1.177.404c.145.05.274.147.363.276l.731 1.044a.716.716 0 0 0 .817.277l1.177-.396a.701.701 0 0 1 .449 0l1.18.396c.3.101.628-.01.817-.277l.729-1.044a.747.747 0 0 1 .365-.276l1.175-.404a.764.764 0 0 0 .505-.725L11 7.943a.79.79 0 0 1 .137-.445l.723-1.05ZM8.119 3.877c-.2-.201-.526-.201-.726 0L3.876 7.392a.516.516 0 0 0 .729.727l3.514-3.515a.51.51 0 0 0 0-.727Zm-4.242 1.06a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06ZM8.12 8.118a.753.753 0 0 1-1.063 0 .753.753 0 0 1 0-1.06.753.753 0 0 1 1.063 0 .753.753 0 0 1 0 1.06Z"></path>
            </svg>
            <span className="text-[10px] font-bold">₹{orderNowDiscount} off | Order NOW</span>
          </div>
        </div>
        
        <p className="text-[11px] font-medium text-gray-500 my-1">Free Delivery</p>

        <div className="flex items-center mt-2 gap-1.5">
          <div className="flex items-center gap-1">
            <span className="bg-[#038D63] text-white px-1.5 py-0.5 rounded-full flex items-center justify-center gap-0.5 shadow-sm text-xs font-bold leading-none">
              {product.rating || "4.1"}
              <svg width="8" height="8" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z" fill="#ffffff"></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="19.08" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className="text-[11px] text-gray-500 font-medium">({(product.reviews && String(product.reviews).length > 0) ? product.reviews : "2696"})</span>
          </div>
          
          <svg width="54" height="16" viewBox="0 0 54 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto">
            <path d="M9.901 5.496a2 2 0 0 1 2-2h41.6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-41.6a2 2 0 0 1-2-2v-9Z" fill="#FFE7FB"></path>
            <path d="M24.712 6H19.5v1.03h2.052v5.843h1.12V7.03h2.041V6ZM24.698 8.229v4.644h1.06v-2.17c0-1.09.52-1.532 1.228-1.532a.95.95 0 0 1 .353.06V8.198a.85.85 0 0 0-.363-.068c-.55 0-1.031.314-1.267.844h-.02v-.746h-.991ZM32.226 12.873V8.229h-1.07v2.67c0 .697-.481 1.188-1.09 1.188-.56 0-.884-.383-.884-1.1V8.23h-1.06v2.975c0 1.129.628 1.816 1.63 1.816.658 0 1.188-.314 1.443-.766h.05v.619h.981ZM35.25 13.02c1.1 0 1.846-.59 1.846-1.532 0-1.855-2.543-1.03-2.543-2.052 0-.304.236-.55.698-.55.422 0 .765.246.814.59l.992-.207c-.167-.706-.893-1.188-1.836-1.188-1.03 0-1.728.57-1.728 1.434 0 1.856 2.543 1.03 2.543 2.052 0 .393-.265.658-.756.658-.481 0-.874-.255-.992-.668l-.972.197c.226.795.943 1.266 1.934 1.266ZM40.083 12.97c.343 0 .638-.058.795-.136l-.118-.855a.992.992 0 0 1-.471.099c-.501 0-.747-.226-.747-.914V9.132h1.287v-.903h-1.287V6.746l-1.07.206V8.23h-.844v.903h.844v2.21c0 1.207.658 1.629 1.61 1.629ZM45.823 11.744l-.894-.265c-.206.422-.589.657-1.09.657-.746 0-1.256-.53-1.355-1.305h3.525v-.265c-.02-1.6-1.03-2.485-2.297-2.485-1.365 0-2.308 1.07-2.308 2.485 0 1.403.992 2.454 2.425 2.454.933 0 1.61-.442 1.994-1.276ZM43.73 8.906c.6 0 1.12.373 1.169 1.198h-2.406c.118-.766.56-1.198 1.237-1.198ZM46.776 10.556c0 1.463.923 2.464 2.17 2.464.619 0 1.237-.255 1.542-.854h.03v.707h.981V6h-1.07v2.828c-.246-.432-.766-.747-1.463-.747-1.247 0-2.19.992-2.19 2.475Zm1.07 0c0-.874.501-1.542 1.316-1.542.805 0 1.296.638 1.296 1.542 0 .893-.49 1.522-1.296 1.522-.795 0-1.315-.648-1.315-1.522Z" fill="#9F2089"></path>
            <path d="M16.5 3.239 9.027.059a.746.746 0 0 0-.585 0L.969 3.24a.782.782 0 0 0-.47.721v6.36c0 5.321 3.139 7.611 7.947 9.622a.746.746 0 0 0 .576 0c4.809-2.01 7.948-4.3 7.948-9.622V3.96c0-.316-.186-.6-.47-.721Z" fill="#FFE7FB"></path>
            <path d="m15.748 3.894-6.75-2.871a.673.673 0 0 0-.528 0l-6.75 2.87a.706.706 0 0 0-.424.652v5.745c0 4.806 2.835 6.874 7.178 8.69.167.07.353.07.52 0 4.343-1.816 7.178-3.884 7.178-8.69V4.545a.706.706 0 0 0-.424-.651Z" fill="#60014A"></path>
            <path d="M10.852 6.455c.804.006 1.482.28 2.04.817.565.54.843 1.185.837 1.946l-.023 3.58c-.003.426-.37.77-.824.77-.45-.003-.814-.35-.81-.777l.022-3.58a1.098 1.098 0 0 0-.367-.85 1.216 1.216 0 0 0-.885-.35 1.247 1.247 0 0 0-.921.372c-.23.227-.344.54-.347.856l-.02 3.528c-.003.432-.376.782-.833.78-.458-.004-.828-.357-.824-.79l.022-3.548c.004-.31-.11-.617-.334-.844a1.254 1.254 0 0 0-.918-.378 1.253 1.253 0 0 0-.892.34c-.24.23-.37.513-.37.845l-.022 3.576c-.004.43-.373.777-.827.774-.455-.003-.818-.353-.815-.783l.023-3.564c.003-.66.25-1.308.714-1.799.6-.632 1.34-.948 2.199-.942.82.006 1.521.285 2.082.853.578-.565 1.272-.835 2.093-.832Z" fill="#FF9D00"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

