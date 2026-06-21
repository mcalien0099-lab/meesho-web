"use client";

import React from "react";
import { useAppContext } from "./context/AppContext";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CategoryBar from "./components/CategoryBar";
import BannerSlider from "./components/BannerSlider";
import ProductGrid from "./components/ProductGrid";
import SidebarFilters from "./components/SidebarFilters";
import MobileFilterBar from "./components/MobileFilterBar";
import CartDrawer from "./components/CartDrawer";
import CategoriesView from "./components/CategoriesView";
import MeeshoMall from "./components/MeeshoMall";
import HelpSection from "./components/HelpSection";
import AccountSection from "./components/AccountSection";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CustomPopup from "./components/CustomPopup";
import Marquee from "./components/Marquee";
import OfferTimer from "./components/OfferTimer";

export default function Home() {
  const { activeTab, wishlist, products } = useAppContext();
  
  const wishlistedProducts = products.filter(p => wishlist.has(p.id || p._id));

  return (
    <div className="app-container">
      {/* Global Header */}
      <Header />

      {/* Main Content Area based on Active Tab */}
      <main className="main-content">
        {activeTab === "home" && (
          <>
            <div className="content-wrapper">
              <BannerSlider />
            </div>
            <Marquee />
            <div className="flex items-center justify-between bg-[#FFF8EE] px-4 py-3 border-b border-gray-100">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <img src="https://images.meesho.com/images/widgets/WT14U/o3i1m.png" width="30" height="30" alt="Easy returns" />
                  <span className="text-[12px] font-bold text-[#60014A] leading-tight w-[70px]">Easy returns & refunds</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <img src="https://images.meesho.com/images/widgets/08B3J/110r9.png" width="30" height="30" alt="Cash on delivery" />
                  <span className="text-[12px] font-bold text-[#60014A] leading-tight w-[60px]">Cash on delivery</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <img src="https://images.meesho.com/images/widgets/SGB1T/l00w1.png" width="30" height="30" alt="Lowest price" />
                  <span className="text-[12px] font-bold text-[#60014A] leading-tight w-[55px]">Lowest price</span>
                </div>
              </div>
            </div>
            <div className="content-wrapper">
              <OfferTimer />
              <div className="flex flex-col md:flex-row gap-6 mt-2 md:mt-4 pb-10">
                <SidebarFilters />
                {/* <MobileFilterBar /> */}
                <ProductGrid />
              </div>
            </div>
            <CustomPopup />
          </>
        )}

        {activeTab === "categories" && <CategoriesView />}
        {activeTab === "mall" && <MeeshoMall />}
        {activeTab === "help" && <HelpSection />}
        {activeTab === "account" && <AccountSection />}
        
        {activeTab === "wishlist" && (
          <div className="content-wrapper py-6">
            <h2 className="text-2xl font-bold text-meesho-text-main mb-6">Your Wishlist ({wishlistedProducts.length})</h2>
            {wishlistedProducts.length === 0 ? (
              <div className="flex-1 w-full flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl md:border border-gray-100 mt-4">
                <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4 text-4xl">
                  ❤️
                </div>
                <h3 className="text-xl font-bold text-meesho-text-main mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">Save your favorite items here. Click the heart icon on any product to add it.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] md:gap-4 bg-gray-200 md:bg-transparent">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id || p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Footer (Desktop only) */}
      <Footer />

      {/* Global Bottom Navigation (Mobile only) */}
      <BottomNav />

      {/* Modals & Overlays */}
      <CartDrawer />
    </div>
  );
}
