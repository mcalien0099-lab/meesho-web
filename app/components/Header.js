"use strict";
"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { SearchIcon, CartIcon, HeartIcon, ProfileIcon } from "./Icons";

export default function Header() {
  const { cart, wishlist, setIsCartOpen, searchQuery, setSearchQuery, handleTabChange } = useAppContext();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      handleTabChange("home"); // Ensure we're on home to see search results
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="header-wrapper">
      <div className="content-wrapper header-inner">
        <div className="flex items-center justify-between w-full md:w-auto">
          <button
            onClick={() => handleTabChange("home")}
            className="logo-text focus:outline-none"
            style={{ fontFamily: '"Mier Book", var(--font-nunito), Helvetica, Arial, sans-serif' }}
          >
            Meesho
          </button>

          {/* Mobile Header Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button className="icon-btn" onClick={() => handleTabChange("wishlist")}>
              <HeartIcon className="w-6 h-6" />
              {wishlist.size > 0 && <span className="badge">{wishlist.size}</span>}
            </button>
            <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
              <CartIcon className="w-6 h-6" />
              {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
            </button>
          </div>
        </div>

        <div className="search-container">
          <SearchIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Try Saree, Kurti or Search by Product Code"
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-6 md:gap-8 hidden md:flex">
          <button className="icon-btn" onClick={() => handleTabChange("account")}>
            <ProfileIcon />
            <span>Profile</span>
          </button>
          
          <button className="icon-btn" onClick={() => handleTabChange("wishlist")}>
            <HeartIcon />
            <span>Wishlist</span>
            {wishlist.size > 0 && <span className="badge">{wishlist.size}</span>}
          </button>

          <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
            <CartIcon />
            <span>Cart</span>
            {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
          </button>
        </div>


      </div>
    </header>
  );
}
