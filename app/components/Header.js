"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { cart, wishlist, setIsCartOpen, searchQuery, setSearchQuery, handleTabChange, settings } = useAppContext();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      handleTabChange("home");
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col">
          {/* Top Row: Menu, Logo, Heart, Cart */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center">
              {/* Menu Icon */}
              <button className="w-8 h-8 flex items-center justify-center cursor-pointer mr-2">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M2 17.2222C2 17.8359 2.49746 18.3333 3.11111 18.3333H20.8889C21.5025 18.3333 22 17.8359 22 17.2222C22 16.6086 21.5025 16.1111 20.8889 16.1111H3.11111C2.49746 16.1111 2 16.6086 2 17.2222ZM2 11.6667C2 12.2803 2.49746 12.7778 3.11111 12.7778H20.8889C21.5025 12.7778 22 12.2803 22 11.6667C22 11.053 21.5025 10.5556 20.8889 10.5556H3.11111C2.49746 10.5556 2 11.053 2 11.6667ZM3.11111 5C2.49746 5 2 5.49746 2 6.11111C2 6.72476 2.49746 7.22222 3.11111 7.22222H20.8889C21.5025 7.22222 22 6.72476 22 6.11111C22 5.49746 21.5025 5 20.8889 5H3.11111Z" fill="#333333"></path>
                </svg>
              </button>
              
              {/* Logo */}
              <button onClick={() => handleTabChange("home")} className="cursor-pointer ml-1 focus:outline-none flex items-center">
                {settings?.logoUrl ? (
                  <img src={settings.logoUrl} alt={settings?.logoName || "Logo"} className="h-7 object-contain max-w-[120px]" />
                ) : (
                  <div className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-meesho-purple to-meesho-pink bg-clip-text text-transparent transition-transform hover:scale-105 lowercase">
                    {settings?.logoName || ""}
                  </div>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 mr-2">
              <button className="relative flex items-center justify-center cursor-pointer" onClick={() => handleTabChange("wishlist")}>
                <svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
                  <path d="M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z" fill="#ED3843"></path>
                </svg>
                {wishlist.size > 0 && <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">{wishlist.size}</span>}
              </button>
              <button className="relative flex items-center justify-center cursor-pointer" onClick={() => setIsCartOpen(true)}>
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
                    <clipPath id="cart-header_svg__a">
                      <path fill="#fff" transform="translate(2.001 1.368)" d="M0 0h20v20H0z"></path>
                    </clipPath>
                    <clipPath id="cart-header_svg__b">
                      <path fill="#fff" transform="translate(2.001 1.368)" d="M0 0h20v20H0z"></path>
                    </clipPath>
                    <clipPath id="cart-header_svg__c">
                      <path fill="#fff" transform="translate(2.001 3.368)" d="M0 0h20v18H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                {totalCartItems > 0 && <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">{totalCartItems}</span>}
              </button>
            </div>
          </div>

          {/* Bottom Row: Search Bar */}
          <div className="px-3 pb-3 w-full">
            <div className="flex items-center w-full bg-[#f0f0f5] border border-gray-200 rounded text-sm px-3 py-2.5 transition-colors focus-within:bg-white focus-within:border-gray-300">
              <div className="mr-2 opacity-50">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2444_6193)">
                    <path d="M13.4564 12.0018L11.4426 14.0156L16.3498 18.9228C16.7013 19.2743 17.2711 19.2743 17.6226 18.9228L18.3636 18.1818C18.7151 17.8303 18.7151 17.2604 18.3636 16.909L13.4564 12.0018Z" fill="#ADADC4"></path>
                    <path d="M14.7135 8.69842C14.7135 12.3299 11.7696 15.2738 8.13812 15.2738C4.50664 15.2738 1.56274 12.3299 1.56274 8.69842C1.56274 5.06694 4.50664 2.12305 8.13812 2.12305C11.7696 2.12305 14.7135 5.06694 14.7135 8.69842Z" fill="#EAEAF2" stroke="#ADADC4" strokeWidth="1.125"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_2444_6193">
                      <rect width="18" height="18" fill="white" transform="translate(1 1.56055)"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for Sarees, Kurtis, Cosmetics, etc."
                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
