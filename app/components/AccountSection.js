"use client";

import React, { useState } from "react";
import { ChevronRight } from "./Icons";

export default function AccountSection() {
  const menuItems = [
    { id: 1, title: "My Orders", icon: "📦", type: "list" },
    { id: 2, title: "My Bank & UPI Details", icon: "🏦", type: "form" },
    { id: 3, title: "My Shared Products", icon: "↗️", type: "list" },
    { id: 4, title: "My Payments", icon: "💳", type: "list" },
    { id: 5, title: "Meesho Community", icon: "👥", type: "info" },
    { id: 6, title: "Settings", icon: "⚙️", type: "settings" },
  ];

  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto py-6">
      <div className="bg-white md:rounded-2xl md:shadow-sm md:border border-gray-200 p-4 md:p-8">
        
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-meesho-purple to-meesho-pink rounded-xl p-6 flex items-center gap-6 text-white shadow-md mb-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 border-4 border-white/10 rounded-full"></div>
          <div className="absolute right-10 bottom-[-20px] w-20 h-20 bg-white/10 rounded-full"></div>
          
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center text-2xl md:text-3xl font-bold shadow-inner relative z-10">
            J
          </div>
          
          <div className="flex-1 relative z-10">
            <h2 className="text-xl md:text-2xl font-bold mb-1">Jane Doe</h2>
            <p className="text-white/80 text-sm font-medium">+91 98765 43210</p>
          </div>
          
          <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors relative z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveModal(item)}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:border-meesho-purple/30 hover:shadow-sm transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-lg group-hover:bg-purple-50 transition-colors">
                {item.icon}
              </div>
              <span className="flex-1 font-semibold text-meesho-text-main text-sm md:text-base">
                {item.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-meesho-purple transition-colors" />
            </button>
          ))}
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
          <button className="text-sm font-medium text-gray-600 text-left hover:text-meesho-purple">About Us</button>
          <button className="text-sm font-medium text-gray-600 text-left hover:text-meesho-purple">Terms & Conditions</button>
          <button className="text-sm font-medium text-gray-600 text-left hover:text-meesho-purple">Privacy Policy</button>
          
          <button className="text-sm font-bold text-meesho-pink text-left hover:text-[#d41c7b] mt-4">
            Log Out
          </button>
        </div>
        
      </div>

      {/* Dynamic Modal */}
      {activeModal && (
        <div className="modal-overlay z-[200]" onClick={() => setActiveModal(null)}>
          <div className="modal-content w-full md:w-[500px] h-auto p-6 flex flex-col md:rounded-2xl rounded-t-2xl rounded-b-none mt-auto md:mt-0 relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 p-2 rounded-full"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{activeModal.icon}</span> {activeModal.title}
            </h2>
            
            {activeModal.type === "form" && (
              <form className="flex flex-col gap-4 mt-2" onSubmit={e => { e.preventDefault(); setActiveModal(null); alert("Saved successfully!"); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number / UPI ID</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-meesho-purple/20 focus:border-meesho-purple outline-none transition-all" placeholder="Enter details" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-meesho-purple/20 focus:border-meesho-purple outline-none transition-all" placeholder="Enter name" required />
                </div>
                <button type="submit" className="btn-primary mt-2">Save Details</button>
              </form>
            )}

            {activeModal.type === "list" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4 grayscale opacity-60">
                  {activeModal.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">No data found</h3>
                <p className="text-sm text-gray-500">You don't have any records here yet.</p>
                <button onClick={() => setActiveModal(null)} className="btn-secondary mt-6 w-full">Go Back</button>
              </div>
            )}

            {activeModal.type === "settings" && (
              <div className="flex flex-col gap-4 mt-2">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-sm text-gray-700">Push Notifications</span>
                  <input type="checkbox" defaultChecked className="accent-meesho-purple w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="font-medium text-sm text-gray-700">Email Updates</span>
                  <input type="checkbox" defaultChecked className="accent-meesho-purple w-4 h-4" />
                </label>
                <button onClick={() => setActiveModal(null)} className="btn-primary mt-4">Save Preferences</button>
              </div>
            )}
            
            {activeModal.type === "info" && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">Join the Meesho Community to connect with millions of resellers and shoppers. Share tips, get style advice, and grow together!</p>
                <button onClick={() => { setActiveModal(null); window.open("https://community.meesho.com", "_blank"); }} className="btn-primary w-full">Visit Community Forum</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
