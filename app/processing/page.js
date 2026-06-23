"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "../context/AppContext";

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartTotal, settings } = useAppContext();
  
  const [showQR, setShowQR] = useState(false);
  const [qrIntent, setQrIntent] = useState('');
  const [orderIdState, setOrderIdState] = useState('');
  
  useEffect(() => {
    const selectedUpi = searchParams.get('upi');
    const orderId = `OD${Math.floor(Math.random() * 10000000000)}`;
    setOrderIdState(orderId);
    
    let upiId = settings?.upiGateway === 'razorpay' ? settings?.razorpayUpiId : settings?.upiId;
    if (!upiId) upiId = 'Paytm.s1pn290@pty';
    
    const storeName = settings?.logoName || "Store";
    
    // Generate an alphanumeric random note (e.g. COD-22hxvdst)
    const randomId = Math.random().toString(36).substring(2, 10).toLowerCase();
    const chatNote = settings?.upiGateway === 'paytm' ? `COD-${randomId}` : orderId;
    
    const isCod = selectedUpi === 'cod';
    const amountToPay = (isCod && Number(settings?.codAdvanceAmount) > 0) ? Number(settings.codAdvanceAmount) : cartTotal;
    
    // For Paytm gateway, we completely remove 'tr' so PhonePe treats it as a P2P transfer (Chat Pay)
    let baseParams = `pa=${upiId}&pn=${storeName}&am=${amountToPay}&cu=INR&tn=${chatNote}`;
    
    if (settings?.upiGateway !== 'paytm') {
      const tr = settings?.razorpayTr || Date.now().toString();
      baseParams += `&tr=${tr}`;
    }
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    let intentUrl = `upi://pay?${baseParams}`;
    
    if (settings?.upiGateway === 'paytm') {
      // Force PhonePe for ALL options if Paytm gateway is selected
      intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=phonepe;package=com.phonepe.app;end` : `phonepe://pay?${baseParams}`;
    } else {
      // Normal routing for Razorpay or other gateways
      if (selectedUpi === 'phonepe' || selectedUpi === 'cod') {
        intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=phonepe;package=com.phonepe.app;end` : `phonepe://pay?${baseParams}`;
      } else if (selectedUpi === 'gpay') {
        intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=tez;package=com.google.android.apps.nbu.paisa.user;end` : `tez://upi/pay?${baseParams}`;
      } else if (selectedUpi === 'paytm') {
        intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=paytmmp;package=net.one97.paytm;end` : `paytmmp://pay?${baseParams}`;
      } else if (selectedUpi === 'bhim') {
        intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=bhim;package=in.org.npci.upiapp;end` : `bhim://pay?${baseParams}`;
      } else if (selectedUpi === 'whatsapp') {
        intentUrl = isAndroid ? `intent://pay?${baseParams}#Intent;scheme=whatsapp;package=com.whatsapp;end` : `whatsapp://pay?${baseParams}`;
      }
    }

    if (!isMobile) {
      // Show QR code for Desktop users
      const rawUpiUrl = `upi://pay?${baseParams}`;
      setQrIntent(rawUpiUrl);
      setShowQR(true);
    } else {
      // Redirect to intent on Mobile
      window.location.href = intentUrl;
      
      // After 3 seconds, redirect to thank you page
      const timer = setTimeout(() => {
        router.push(`/thank-you?order_id=${orderId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartTotal, settings, router, searchParams]);

  if (showQR) {
    return (
      <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#1a2024] mb-2">Scan & Pay</h2>
          <p className="text-gray-500 mb-6 text-sm">Scan this QR code using PhonePe, GPay, or Paytm on your mobile to complete the payment.</p>
          
          <div className="p-4 border border-gray-200 rounded-xl mb-6 bg-white">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrIntent)}`} 
              alt="Payment QR Code" 
              className="w-48 h-48"
            />
          </div>
          
          <button 
            onClick={() => router.push(`/thank-you?order_id=${orderIdState}`)}
            className="w-full bg-meesho-purple text-white py-3.5 rounded-lg font-bold text-[15px] hover:bg-opacity-90 transition-all"
          >
            I have made the payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-meesho-purple rounded-full animate-spin mb-8"></div>
        <p className="text-[28px] font-bold text-[#1a2024] mb-4">Waiting for redirection...</p>
        <p className="text-gray-500 text-[15px]">Please do not close or refresh this page.</p>
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#EAEAF2] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-100 border-t-meesho-purple rounded-full animate-spin mb-8"></div>
        </div>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}
