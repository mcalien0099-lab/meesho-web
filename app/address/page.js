"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "../components/CheckoutStepper";

export default function AddressPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    landmark: ""
  });

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
    if (!formData.name || !formData.phone || !formData.house || !formData.area || !formData.pincode || !formData.city || !formData.state) {
      alert("Please fill all mandatory fields.");
      return;
    }
    localStorage.setItem("address", JSON.stringify(formData));
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-[#EAEAF2] pb-[80px]">
      <div className="bg-white">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z" fill="#666666"></path>
            </svg>
          </button>
          <h1 className="text-[17px] font-bold text-gray-800 tracking-wide uppercase">Add Address</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto bg-white min-h-screen relative">
        <CheckoutStepper currentStep={2} />
        <div className="bg-[#EAEAF2] h-2 w-full"></div>

        <div className="p-4 flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-meesho-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <h2 className="text-[16px] font-bold text-[#333333]">Contact Details</h2>
          </div>

          <div className="flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact Number" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
          </div>

          <div className="flex items-center gap-2 mb-2 mt-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-meesho-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h2 className="text-[16px] font-bold text-[#333333]">Address</h2>
          </div>

          <div className="flex flex-col gap-4">
            <input name="house" value={formData.house} onChange={handleChange} placeholder="House no. / Building Name" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
            <input name="area" value={formData.area} onChange={handleChange} placeholder="Road Name / Area / Colony" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
            <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
            <div className="flex gap-4">
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="flex-1 border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="flex-1 border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
            </div>
            <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Nearby Famous Shop/Mall/Landmark" className="w-full border-b border-gray-300 py-2 focus:border-meesho-purple outline-none text-[15px]" />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-[800px] mx-auto bg-white border-t border-gray-200 z-50 p-3">
          <button onClick={handleSave} className="w-full bg-meesho-purple text-white py-3 rounded font-bold text-[15px]">
            Save Address and Continue
          </button>
        </div>
      </div>
    </div>
  );
}
