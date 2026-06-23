"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "../components/CheckoutStepper";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const InputField = ({ label, name, value, placeholder, type = "text", onChange, error }) => (
  <div className="relative mb-4 w-full">
    <label className={`absolute -top-2.5 left-3 bg-white px-2 text-[12px] font-bold z-10 ${error ? 'text-red-500' : 'text-gray-500'}`}>
      {label}
    </label>
    <input 
      type={type}
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className={`w-full border rounded-xl py-3 px-4 outline-none text-[15px] font-medium text-[#333333] h-[50px] ${error ? 'border-red-500 focus:border-red-500 bg-red-50/5' : 'border-gray-300 focus:border-meesho-purple'}`} 
    />
    {error && <span className="text-red-500 text-[10px] font-bold mt-0.5 block pl-2 animate-pulse">This field is required</span>}
  </div>
);

export default function AddressPage() {
  const { cart, isLoaded } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.push("/");
    }
  }, [cart.length, isLoaded, router]);

  if (!isLoaded || cart.length === 0) {
    return null;
  }

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    area: ""
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("address");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.pincode || !formData.city || !formData.state || !formData.house || !formData.area) {
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    localStorage.setItem("address", JSON.stringify(formData));
    router.push("/payment");
  };



  return (
    <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col overflow-hidden">
      <div className="bg-white shrink-0">
        <div className="flex items-center px-4 py-2 border-b border-gray-100">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z" fill="#666666"></path>
            </svg>
          </button>
          <h1 className="text-[15px] font-bold text-gray-800 tracking-wide uppercase">Add Delivery Address</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto bg-white relative shadow-sm flex-grow flex flex-col overflow-hidden w-full">
        <CheckoutStepper currentStep={2} />
        <div className="bg-[#EAEAF2] h-[5px] w-full shrink-0"></div>

        <div className="px-4 pt-3 pb-0 flex flex-col flex-grow overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5472d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="#5472d3"></circle>
            </svg>
            <h2 className="text-[15px] font-bold text-[#333333]">Address</h2>
          </div>

          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} error={showErrors && !formData.name} />
          <InputField label="Mobile number" name="phone" value={formData.phone} type="tel" onChange={handleChange} error={showErrors && !formData.phone} />
          <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={showErrors && !formData.pincode} />

          <div className="flex gap-4">
            <div className="flex-1">
              <InputField label="City" name="city" value={formData.city} onChange={handleChange} error={showErrors && !formData.city} />
            </div>
            <div className="flex-1">
              <div className="relative mb-4 w-full">
                <label className={`absolute -top-2.5 left-3 bg-white px-2 text-[12px] font-bold z-10 ${showErrors && !formData.state ? 'text-red-500' : 'text-gray-500'}`}>
                  State
                </label>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full border rounded-xl py-3 px-4 outline-none text-[15px] font-medium text-[#333333] cursor-pointer flex justify-between items-center relative h-[50px] ${showErrors && !formData.state ? 'border-red-500 bg-red-50/5' : 'border-gray-300'}`}
                >
                  <span className={formData.state ? "text-[#333333]" : "text-transparent"}>{formData.state || "State"}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                {showErrors && !formData.state && <span className="text-red-500 text-[10px] font-bold mt-0.5 block pl-2 animate-pulse">This field is required</span>}
                 {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl z-50 max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {INDIAN_STATES.map((st) => (
                      <div 
                        key={st} 
                        onClick={() => { setFormData({...formData, state: st}); setIsDropdownOpen(false); }}
                        className="px-3.5 py-1.5 hover:bg-gray-50 cursor-pointer text-[13px] border-b border-gray-100 last:border-none"
                      >
                        {st}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <InputField label="House No., Building Name" name="house" value={formData.house} onChange={handleChange} error={showErrors && !formData.house} />
          <InputField label="Road name, Area, Colony" name="area" value={formData.area} onChange={handleChange} error={showErrors && !formData.area} />
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="max-w-[800px] w-full bg-[#f8f8fb] border-t border-gray-200 shrink-0 mt-auto">
          <div className="px-4 py-2 border-b border-gray-200 flex justify-center gap-6 opacity-70">
            <div className="flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold leading-none text-[#333]">PCI DSS</span>
                <span className="text-[9px] leading-none text-gray-500">Certified</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold leading-none text-[#333]">100% Secured</span>
                <span className="text-[9px] leading-none text-gray-500">Payments</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold leading-none text-[#333]">Verified</span>
                <span className="text-[9px] leading-none text-gray-500">Merchant</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 pt-1 pb-1 text-[11px] text-gray-500">
            <span>T&C | Privacy | e950df29</span>
            <span className="flex items-center gap-1">Powered By <span className="text-[#f7a200] font-bold tracking-tight text-[12px] italic">GoKwik</span></span>
          </div>
          <div className="p-2.5 bg-white">
            <button onClick={handleSave} className="w-full bg-meesho-purple text-white py-3 rounded font-bold text-[15px]">
              Save Address and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
