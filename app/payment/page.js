"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "../components/CheckoutStepper";
import { useAppContext } from "../context/AppContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cartTotal, cart, settings } = useAppContext();
  const [selectedUpi, setSelectedUpi] = useState("paytm");
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const slideLogos = [
    <img key="paytm" src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/paytm_icon.svg" alt="Paytm" className="h-3.5 w-auto object-contain" />,
    <img key="gpay" src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/gpay_icon.svg" alt="GPay" className="h-5 w-5 object-contain" />,
    <img key="phonepe" src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/phonepe.svg" alt="PhonePe" className="h-5 w-5 object-contain" />,
    <img key="bhim" src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/bhim_upi.svg" alt="BHIM UPI" className="h-4 w-auto object-contain" />,
    <img key="whatsapp" src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/whatspp_pay.svg" alt="WhatsApp Pay" className="h-5 w-5 object-contain" />
  ];

  useEffect(() => {
    const int = setInterval(() => {
      setActiveLogoIndex(prev => (prev + 1) % slideLogos.length);
    }, 2000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart.length, router]);

  if (cart.length === 0) {
    return null;
  }

  const handlePay = () => {
    router.push(`/processing?upi=${selectedUpi}`);
  };

  const RadioButton = ({ selected }) => (
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-meesho-purple' : 'border-gray-300'}`}>
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-meesho-purple"></div>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col overflow-hidden">
      <div className="bg-white shrink-0">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z" fill="#666666"></path>
            </svg>
          </button>
          <h1 className="text-[15px] font-bold text-gray-800 tracking-wide uppercase">Payment</h1>
        </div>
      </div>
      <div className="max-w-[800px] w-full mx-auto bg-white flex-grow flex flex-col relative shadow-sm overflow-hidden">
        <CheckoutStepper currentStep={3} />
        <div className="bg-[#EAEAF2] h-1.5 w-full shrink-0"></div>

        {/* Scrollable middle container */}
        <div className="flex-grow overflow-y-auto flex flex-col">
          <div className="px-4 flex flex-col py-2.5">
            <div className="flex justify-between items-center mb-2.5">
              <h2 className="text-[16px] font-bold text-[#333333]">Select Payment Method</h2>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[#8ba2f3]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515a12.74 12.74 0 008.38 21.05a.75.75 0 00.924.044l.415-.272A12.822 12.822 0 0012 21.361c3.155 0 6.096-1.144 8.36-3.084a.75.75 0 00.327-.723c-.156-4.621-2.264-8.868-5.834-11.758a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08h-.001c-.134-.134-.351-.134-.485 0zM10.25 14.25a.75.75 0 011.06 0l4.25-4.25a.75.75 0 10-1.06-1.06l-3.72 3.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[9px] font-bold tracking-tight uppercase leading-tight text-gray-500">100% SAFE<br/>PAYMENTS</span>
                </div>
              </div>
            </div>

            <div className="bg-[#eff4ff] rounded-md py-2.5 px-3.5 flex items-center gap-3 mb-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.9998 1.40039L14.7709 3.5905L18.1566 2.76672L19.5518 5.96253L22.8643 7.02058L22.186 10.3758L24.5002 12.9818L22.186 15.5879L22.8643 18.9431L19.5518 20.0012L18.1566 23.197L14.7709 22.3732L11.9998 24.5633L9.2287 22.3732L5.84305 23.197L4.44781 20.0012L1.13531 18.9431L1.81358 15.5879L-0.50058 12.9818L1.81358 10.3758L1.13531 7.02058L4.44781 5.96253L5.84305 2.76672L9.2287 3.5905L11.9998 1.40039Z" fill="#038D63"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.3536 8.64645C15.5488 8.84171(15.5488, 9.15829) 15.3536 9.35355L9.35355 15.3536C9.15829 15.5488 8.84171 15.5488 8.64645 15.3536C8.45118 15.1583 8.45118 14.8417 8.64645 14.6464L14.6464 8.64645C14.8417 8.45118 15.1583 8.45118 15.3536 8.64645Z" fill="white"/>
                <circle cx="9.5" cy="9.5" r="1.5" fill="white"/>
                <circle cx="14.5" cy="14.5" r="1.5" fill="white"/>
              </svg>
              <span className="text-meesho-purple font-bold text-[14px]">Pay online & get EXTRA ₹33 off</span>
            </div>

            <div className="flex items-center mb-2.5 gap-3">
              <span className="text-[11px] font-bold text-[#333333] tracking-wide">PAY ONLINE</span>
              <div className="h-[1px] flex-grow bg-gray-200"></div>
            </div>

            <div className="flex flex-col border border-gray-200 shadow-sm rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer bg-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <div className="bg-meesho-purple text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">UPI</div>
                  <div className="font-bold text-[15px] text-[#333333]">UPI(GPay/PhonePe/Paytm)</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              
              <div className="flex flex-col bg-white">
                {settings?.showGPay !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('gpay')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'gpay'} />
                      <span className="text-[14.5px] font-bold text-[#333]">G Pay</span>
                      {settings?.gpayOfferText && <span className="text-[#038D63] font-bold text-[12.5px] ml-2">{settings.gpayOfferText}</span>}
                    </div>
                    <img src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/gpay_icon.svg" alt="GPay" className="h-5 w-5 object-contain" />
                  </div>
                )}
                
                {settings?.showPhonePe !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('phonepe')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'phonepe'} />
                      <span className="text-[14.5px] font-bold text-[#333]">PhonePe</span>
                      <span className="text-[#038D63] font-bold text-[12.5px] ml-2">20% Cashback in 24 hour</span>
                    </div>
                    <img src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/phonepe.svg" alt="PhonePe" className="h-6 w-6 object-contain" />
                  </div>
                )}

                {settings?.showPaytm !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('paytm')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'paytm'} />
                      <span className="text-[14.5px] font-bold text-[#333]">Paytm</span>
                    </div>
                    <img src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/paytm_icon.svg" alt="Paytm" className="h-4 w-auto object-contain" />
                  </div>
                )}

                {settings?.showBHIM !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('bhim')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'bhim'} />
                      <span className="text-[14.5px] font-bold text-[#333]">BHIM UPI</span>
                    </div>
                    <img src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/bhim_upi.svg" alt="BHIM" className="h-5 w-auto object-contain" />
                  </div>
                )}

                {settings?.showWhatsApp !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('whatsapp')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'whatsapp'} />
                      <span className="text-[14.5px] font-bold text-[#333]">WhatsApp Pay</span>
                    </div>
                    <img src="https://mediumorchid-goshawk-165656.hostingersite.com/assets/website/images/whatspp_pay.svg" alt="WhatsApp" className="h-5 w-5 object-contain" />
                  </div>
                )}
                
                {settings?.showCOD !== false && (
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => setSelectedUpi('cod')}>
                    <div className="flex items-center gap-4">
                      <RadioButton selected={selectedUpi === 'cod'} />
                      <span className="text-[14.5px] font-bold text-[#333]">Cash on Delivery (COD)</span>
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-[10px]">
                      COD
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-[#EAEAF2] h-1.5 w-full mt-1"></div>

          <div className="bg-white px-4 py-1.5 border-b border-gray-200">
            <div className="flex justify-between items-center py-1 text-[14px] font-bold text-[#333333]">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between items-center py-1 text-[14px] font-bold text-[#333333]">
              <span>Total Product Price:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="h-[1px] bg-gray-200 w-full my-2"></div>
            
            <div className="flex justify-between items-center py-1 text-[14.5px] font-bold text-[#333333]">
              <span>Order Total :</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-[#EAEAF2] flex-grow w-full min-h-[10px]"></div>
        </div>

        <div className="max-w-[800px] w-full mx-auto bg-white border-t border-gray-200 px-4 py-2.5 flex justify-between items-center shrink-0 mt-auto">
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#333333]">₹{cartTotal.toFixed(2)}</span>
            <button className="text-meesho-purple text-[11px] font-bold tracking-wider mt-0.5 text-left">VIEW PRICE DETAILS</button>
          </div>
          <button onClick={handlePay} className="w-[45%] bg-meesho-purple text-white py-3 rounded-md font-bold text-[15px]">
            {selectedUpi === 'cod' ? 'Place Order' : 'PayNow'}
          </button>
        </div>
      </div>
    </div>
  );
}
