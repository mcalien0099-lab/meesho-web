"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "../components/CheckoutStepper";
import { useAppContext } from "../context/AppContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cartTotal, cart, settings } = useAppContext();
  const [selectedUpi, setSelectedUpi] = useState("paytm");
  
  if (cart.length === 0) {
    if (typeof window !== "undefined") router.push("/");
    return null;
  }

  const handlePay = () => {
    const upiId = settings?.upiGateway === 'razorpay' ? settings?.razorpayUpiId : settings?.upiId;
    alert(`Order Placed Successfully via ${selectedUpi.toUpperCase()} to ${upiId}! (Total: ₹${cartTotal})`);
    router.push("/");
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
          <h1 className="text-[17px] font-medium text-gray-700 tracking-wide uppercase">Payment</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto bg-white min-h-screen relative">
        <CheckoutStepper currentStep={3} />
        <div className="bg-[#EAEAF2] h-[1px] w-full"></div>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-[17px] font-bold text-[#333333]">Select Payment Method</h2>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#5f74ee]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 008.38 21.05a.75.75 0 00.924.044l.415-.272A12.822 12.822 0 0012 21.361c3.155 0 6.096-1.144 8.36-3.084a.75.75 0 00.327-.723c-.156-4.621-2.264-8.868-5.834-11.758a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08h-.001c-.134-.134-.351-.134-.485 0zM10.25 14.25a.75.75 0 011.06 0l4.25-4.25a.75.75 0 10-1.06-1.06l-3.72 3.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-bold tracking-tight uppercase leading-tight">100% SAFE<br/>PAYMENTS</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eff4ff] rounded-md py-3 px-4 flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1 flex items-center">
              <span className="text-[#00B9F5] font-black text-xs tracking-tighter">pay</span>
              <span className="text-[#002E6E] font-black text-xs tracking-tighter">tm</span>
            </div>
            <span className="text-[#5f74ee] font-bold text-[14px]">Pay online & get EXTRA ₹33 off</span>
          </div>

          <div className="flex items-center my-2 gap-3">
            <span className="text-[12px] font-bold text-[#333333] tracking-wide">PAY ONLINE</span>
            <div className="h-[1px] flex-grow bg-gray-200"></div>
          </div>

          <div className="flex flex-col border border-gray-100 shadow-sm rounded">
            <div className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="bg-[#5f74ee] text-white text-[10px] font-bold px-1 rounded-sm">UPI</div>
                <div className="font-medium text-[16px] text-[#333333]">UPI(GPay/PhonePe/Paytm)</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            
            <div className="flex flex-col">
              {/* G Pay */}
              {settings?.showGPay && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('gpay')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'gpay' ? 'border-[#3f51b5]' : 'border-gray-300'}`}>
                      {selectedUpi === 'gpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#3f51b5]"></div>}
                    </div>
                    <span className="text-[15px] font-medium text-[#333]">G Pay</span>
                    {settings?.gpayOfferText && <span className="text-[#038D63] font-bold text-[13px] ml-2">{settings.gpayOfferText}</span>}
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="GPay" className="w-5 h-5 object-contain" />
                </div>
              )}
              
              {/* PhonePe */}
              {settings?.showPhonePe && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('phonepe')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'phonepe' ? 'border-[#3f51b5]' : 'border-gray-300'}`}>
                      {selectedUpi === 'phonepe' && <div className="w-2.5 h-2.5 rounded-full bg-[#3f51b5]"></div>}
                    </div>
                    <span className="text-[15px] font-medium text-[#333]">PhonePe</span>
                    {settings?.phonepeOfferText && <span className="text-[#038D63] font-bold text-[13px] ml-2">{settings.phonepeOfferText}</span>}
                  </div>
                  <div className="bg-[#6739b7] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-[14px]">पे</div>
                </div>
              )}

              {/* Paytm */}
              {settings?.showPaytm && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('paytm')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'paytm' ? 'border-[#1f6df5]' : 'border-gray-300'}`}>
                      {selectedUpi === 'paytm' && <div className="w-2.5 h-2.5 rounded-full bg-[#1f6df5]"></div>}
                    </div>
                    <span className="text-[15px] font-medium text-[#333]">Paytm</span>
                    {settings?.paytmOfferText && <span className="text-[#038D63] font-bold text-[13px] ml-2">{settings.paytmOfferText}</span>}
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#002E6E] font-black text-[13px] tracking-tighter">pay</span>
                    <span className="text-[#00B9F5] font-black text-[13px] tracking-tighter">tm</span>
                  </div>
                </div>
              )}

              {/* BHIM UPI */}
              {settings?.showBHIM && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('bhim')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'bhim' ? 'border-[#3f51b5]' : 'border-gray-300'}`}>
                      {selectedUpi === 'bhim' && <div className="w-2.5 h-2.5 rounded-full bg-[#3f51b5]"></div>}
                    </div>
                    <span className="text-[15px] font-medium text-[#333]">BHIM UPI</span>
                    {settings?.bhimOfferText && <span className="text-[#038D63] font-bold text-[13px] ml-2">{settings.bhimOfferText}</span>}
                  </div>
                  <div className="flex flex-col items-center italic tracking-tighter font-black">
                    <span className="text-orange-500 text-[8px] leading-[8px] mr-2">BHIM</span>
                    <span className="text-green-600 text-[8px] leading-[8px] ml-1">UPI</span>
                  </div>
                </div>
              )}

              {/* Amazon Pay */}
              {settings?.showAmazonPay && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('amazonpay')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'amazonpay' ? 'border-[#3f51b5]' : 'border-gray-300'}`}>
                      {selectedUpi === 'amazonpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#3f51b5]"></div>}
                    </div>
                    <span className="text-[15px] font-medium text-[#333]">Amazon Pay</span>
                    {settings?.amazonpayOfferText && <span className="text-[#038D63] font-bold text-[13px] ml-2">{settings.amazonpayOfferText}</span>}
                  </div>
                  <div className="font-bold italic text-[#FF9900] text-[14px]">amazon<span className="text-[#146EB4]">pay</span></div>
                </div>
              )}
              
              {(!settings?.showGPay && !settings?.showPhonePe && !settings?.showPaytm && !settings?.showBHIM && !settings?.showAmazonPay) && (
                <div className="text-center py-6 text-gray-500">
                  No payment methods are currently active.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-[#EAEAF2] h-2 w-full mt-2"></div>

        <div className="bg-white p-4 pb-20">
          <div className="flex justify-between items-center py-2 text-[15px] font-medium text-[#353543]">
            <span>Shipping:</span>
            <span className="text-green-600 font-bold">FREE</span>
          </div>
          <div className="flex justify-between items-center py-2 text-[15px] text-[#353543]">
            <span>Total Product Price:</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="h-[1px] bg-gray-200 w-full my-3"></div>
          
          <div className="flex justify-between items-center py-2 text-[16px] font-bold text-[#353543]">
            <span>Order Total :</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-[800px] mx-auto bg-white border-t border-gray-200 z-50 p-3 flex justify-between items-center">
          <div className="flex flex-col pl-2">
            <span className="text-[18px] font-bold text-[#333333]">₹{cartTotal.toFixed(2)}</span>
            <button className="text-meesho-purple text-[12px] font-bold tracking-wider mt-1 text-left">VIEW PRICE DETAILS</button>
          </div>
          <button onClick={handlePay} className="w-1/2 bg-meesho-purple text-white py-3 rounded font-bold text-[15px]">
            PayNow
          </button>
        </div>
      </div>
    </div>
  );
}
