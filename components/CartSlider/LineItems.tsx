"use client";

import { useCart } from "@/context/CartContext";
import { CART_LINE_TYPE } from "@/types/cartTypes";
import { formatPrice } from "@/utils/formatPricing";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { removeItemAction } from "@/app/(cart)/removeItem/action";
export const LineItems = () => {
  const cart = useCart();

  const deleteItem = async (id: string) => {
    const formData = new FormData();
    formData.append("line-id", id);

    const res = await removeItemAction(formData);

    console.log(formData);
    if (!res.success || !res.data) {
      console.error(res.errors);
      return;
    }

    console.log("item deleted");
    cart.setCart(res.data);
  };

  return (
    <div className="w-full flex-1 overflow-y-auto no-scrollbar pr-1">
      {cart.cart?.lines.nodes ? (
        <ul>
          {cart.cart.lines.nodes.map((item: CART_LINE_TYPE) => (
            <li key={item.id} className="w-full">
              <div className="flex my-4 relative">
                <div className="w-20 mr-2 h-20 border border-gray-200 bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={item.merchandise.image.url}
                    alt={item.merchandise.product.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1">
                  <div className="info-wrapper relative">
                    <h4 className="text-sm font-bold">
                      {item.merchandise.product.title}
                      <span> - {item.merchandise.title}</span>
                    </h4>
                    <span className="block text-sm font-bold mt-1">
                      {formatPrice(
                        item.cost.totalAmount.amount,
                        item.cost.totalAmount.currencyCode,
                      )}
                    </span>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="absolute right-0 top-0"
                    >
                      <i>
                        <AiFillDelete color="red" size={20} />
                      </i>
                    </button>
                  </div>

                  <div
                    className="flex items-center justify-between gap-2 mt-1 border border-gray-400 rounded-full w-25 py-1 px-2"
                    data-variant-id={item.id}
                  >
                    <button>
                      <AiOutlinePlus />
                    </button>
                    <span>{item.quantity}</span>
                    <button>
                      <AiOutlineMinus />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};
