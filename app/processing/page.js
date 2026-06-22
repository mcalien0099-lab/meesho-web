"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "../context/AppContext";

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartTotal, settings } = useAppContext();
  
  useEffect(() => {
    const selectedUpi = searchParams.get('upi');
    const orderId = `OD${Math.floor(Math.random() * 10000000000)}`;
    
    let upiId = settings?.upiGateway === 'razorpay' ? settings?.razorpayUpiId : settings?.upiId;
    if (!upiId) upiId = 'Paytm.s1pn290@pty';
    
    const storeName = settings?.logoName || "Store";
    const tr = settings?.razorpayTr || Date.now().toString();
    const baseParams = `pa=${upiId}&pn=${storeName}&tr=${tr}&am=${cartTotal}&cu=INR&tn=${orderId}`;
    
    const isAndroid = /Android/i.test(navigator.userAgent);
    let intentUrl = `upi://pay?${baseParams}`;
    
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

    // Redirect to intent
    window.location.href = intentUrl;
    
    // After 3 seconds, redirect to thank you page
    const timer = setTimeout(() => {
      router.push(`/thank-you?order_id=${orderId}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [cartTotal, settings, router, searchParams]);

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
