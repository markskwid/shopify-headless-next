"use client";

import { useCart } from "@/context/Cart";
import { formatPrice } from "@/utils/formatPricing";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { LineItems } from "./LineItems";
import { useEffect } from "react";
import { useUI } from "@/context/UserInterface";

export const CartSlider = () => {
  const { cart } = useCart();
  const { toggleCart, isCartOpen, handleOverlayClick } = useUI();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const isCartEmpty = cart?.lines.nodes.length === 0;

  return (
    <div
      onClick={handleOverlayClick}
      className={`flex justify-end items-start min-h-screen w-full fixed left-0 right-0 top-0 transition-opacity duration-75 bg-black/30 ease-out z-100 ${isCartOpen ? "opacity-100 pointer-events-auto delay-0" : "opacity-0 pointer-events-none delay-200"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-full md:w-100 lg:w-105 bg-white p-4 flex flex-col justify-start items-start transition-transform duration-200 ease-out ${isCartOpen ? "translate-x-0 delay-100" : "translate-x-full delay-0"}`}
      >
        <div className="">
          <h3 className="font-bold text-xl mb-2 w-full flex items-center">
            <i className="mr-2 cursor-pointer" onClick={toggleCart}>
              <AiOutlineArrowLeft />
            </i>
            Shopping Cart
          </h3>
        </div>
        <LineItems />
        {!isCartEmpty && (
          <div className="[&_.button]:bg-black [&_.button]:text-white! [&_.button]:font-bold [&_.button]:block [&_.button]:w-full [&_.button]:rounded-full [&_.button]:mt-2 [&_.button]:p-3 [&_.button]:text-center [&_.button]:text-lg py-4 border-t border-neutral-300 w-full mt-auto">
            <div className="mb-5">
              <h3 className="flex justify-between items-center font-bold text-xl">
                Total Amount:{" "}
                <span>
                  {formatPrice(
                    cart?.cost.totalAmount?.amount ?? "0",
                    cart?.cost.totalAmount?.currencyCode ?? "USD",
                  )}
                </span>
              </h3>
              <span className="text-sm text-left block mt-1 text-neutral-500!">
                Shipping & Taxes are added to checkout
              </span>
            </div>
            <button className="button">Go to Cart</button>
            {cart?.checkoutUrl && (
              <a className="button" href={cart.checkoutUrl}>
                Checkout Now
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
