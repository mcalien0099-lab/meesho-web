"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import CheckoutStepper from "../components/CheckoutStepper";
import Link from "next/link";
import Header from "../components/Header";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQty, cartTotal } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#EAEAF2] pb-[100px]">
      <div className="bg-white">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <button onClick={() => router.back()} className="mr-3">
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z" fill="#666666"></path>
            </svg>
          </button>
          <h1 className="text-[17px] font-bold text-gray-800 tracking-wide uppercase">Cart</h1>
        </div>
      </div>

      <div className="cart-drawer">
        <CheckoutStepper currentStep={1} />

        <div className="bg-[#EAEAF2] h-2 w-full"></div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 450.391 450.391" fill="#cccccc">
              <path d="M143.673 350.322c-25.969 0-47.02 21.052-47.02 47.02 0 25.969 21.052 47.02 47.02 47.02 25.969 0 47.02-21.052 47.02-47.02.001-25.968-21.051-47.02-47.02-47.02zm0 73.143c-14.427 0-26.122-11.695-26.122-26.122s11.695-26.122 26.122-26.122 26.122 11.695 26.122 26.122c.001 14.427-11.695 26.122-26.122 26.122zM342.204 350.322c-25.969 0-47.02 21.052-47.02 47.02 0 25.969 21.052 47.02 47.02 47.02s47.02-21.052 47.02-47.02c0-25.968-21.051-47.02-47.02-47.02zm0 73.143c-14.427 0-26.122-11.695-26.122-26.122s11.695-26.122 26.122-26.122 26.122 11.695 26.122 26.122c.001 14.427-11.695 26.122-26.122 26.122zM448.261 76.037a13.064 13.064 0 0 0-8.359-4.18L99.788 67.155 90.384 38.42C83.759 19.211 65.771 6.243 45.453 6.028H10.449C4.678 6.028 0 10.706 0 16.477s4.678 10.449 10.449 10.449h35.004a27.17 27.17 0 0 1 25.078 18.286l66.351 200.098-5.224 12.016a50.154 50.154 0 0 0 4.702 45.453 48.588 48.588 0 0 0 39.184 21.943h203.233c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449H175.543a26.646 26.646 0 0 1-21.943-12.539 28.733 28.733 0 0 1-2.612-25.078l4.18-9.404 219.951-22.988c24.16-2.661 44.034-20.233 49.633-43.886L449.83 84.917a8.882 8.882 0 0 0-1.569-8.88zm-43.885 109.191c-3.392 15.226-16.319 26.457-31.869 27.69l-217.339 22.465-48.588-147.33 320.261 4.702-22.465 92.473z"></path>
            </svg>
            <p className="text-[20px] font-semibold text-[#1a2024] mt-12 mb-10">Your cart is feeling lonely</p>
            <Link href="/">
              <button className="bg-meesho-purple text-white px-6 py-3 rounded text-[16px] font-semibold">Start shopping</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-products-list">
              {cart.map((item, index) => (
                <div key={`${item.id || item._id}-${item.size}-${index}`} className="flex p-4 border-b-4 border-[#EAEAF2] bg-white">
                  <div className="w-[80px] h-[80px] flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="ml-4 flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <p className="text-[15px] text-[#333333] font-medium leading-tight truncate pr-4 max-w-[200px]">
                        {item.title || item.name}
                      </p>
                      <button onClick={() => removeFromCart(item.id || item._id, item.size)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="mt-1">
                      <span className="text-[15px] font-bold text-[#333333]">₹{item.price}</span>
                      {item.originalPrice > 0 && (
                        <span className="text-[12px] text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[13px] text-gray-600">Size : {item.size}</p>
                      <p className="text-[13px] text-gray-800">Qty: {item.qty < 10 ? `0${item.qty}` : item.qty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 pb-0">
              <div className="flex justify-between items-center py-2 text-[15px] font-medium text-[#353543]">
                <span>Shipping:</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center py-2 text-[14px] text-[#353543]">
                <span className="underline decoration-dotted">Total Product Price:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="h-[1px] bg-gray-200 w-full my-3"></div>
              
              <div className="flex justify-between items-center py-2 text-[16px] font-bold text-[#353543]">
                <span>Order Total :</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#EAEAF2] h-2 w-full mt-4"></div>

            <div className="bg-white p-4 text-center">
              <img src="https://images.meesho.com/images/marketing/1588578650850.webp" alt="Safety priority" className="w-full max-w-[400px] mx-auto rounded" />
            </div>

            {/* Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[800px] mx-auto bg-white border-t border-gray-200 z-50">
              <div className="flex justify-between items-center p-3">
                <div className="flex flex-col pl-2">
                  <span className="text-[18px] font-bold text-[#333333]">₹{cartTotal.toFixed(2)}</span>
                  <button className="text-meesho-purple text-[12px] font-bold tracking-wider mt-1 text-left">VIEW PRICE DETAILS</button>
                </div>
                <Link href="/address" className="w-1/2">
                  <button className="w-full bg-meesho-purple text-white py-3 rounded font-bold text-[15px]">
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
