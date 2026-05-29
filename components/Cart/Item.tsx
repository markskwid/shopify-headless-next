"use client";
import { useCart } from "@/context/Cart";
import { CART_LINE_TYPE } from "@/types/cart";
import { formatPrice } from "@/utils/formatPricing";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function Item({ item }: { item: CART_LINE_TYPE }) {
  const { updatingVariant, deleteItem, updateItem } = useCart();

  return (
    <tr
      className={`${updatingVariant === item.id ? "bg-neutral-500/20 pointer-events-none" : ""}`}
    >
      <td className="w-[40%]">
        <div className="flex space-x-5 relative">
          <button
            onClick={() => deleteItem(item.id)}
            className="rounded-full w-8 h-8 flex items-center justify-center bg-red-600 border absolute -left-3 top-0"
            title="Delete Item"
          >
            <AiFillDelete color="white" />
          </button>
          <Link href={`/product/${item.merchandise.product.handle}`}>
            <div className="w-20 mr-2 h-20 border border-gray-200 bg-gray-200 rounded-md overflow-hidden">
              <Image
                src={item.merchandise.image.url}
                alt={item.merchandise.product.title}
                width={80}
                height={80}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </Link>

          <div>
            <Link href={`/product/${item.merchandise.product.handle}`}>
              <h3 className="font-bold text-lg">
                {item.merchandise.product.title}
              </h3>
            </Link>
            <span className="text-neutral-400! text-sm">
              {item.merchandise.selectedOptions.map((i) => (
                <span key={i.name}>
                  <strong>
                    {i.name}: {i.value}
                  </strong>
                </span>
              ))}
            </span>
          </div>
        </div>
      </td>

      <td className="w-[20%]">
        <strong>
          {formatPrice(
            item.merchandise.price.amount,
            item.merchandise.price.currencyCode,
          )}
        </strong>
      </td>

      <td className="w-[20%]">
        <div
          className="flex items-center justify-between gap-2 mt-1 border border-gray-400 rounded-full w-25 py-1 px-2"
          data-variant-id={item.id}
        >
          <button
            data-variant-id={item.id}
            onClick={() => updateItem(item.id, item.quantity.toString(), "inc")}
          >
            <AiOutlinePlus />
          </button>
          <span>{item.quantity}</span>
          <button
            data-variant-id={item.id}
            onClick={() => updateItem(item.id, item.quantity.toString(), "dec")}
          >
            <AiOutlineMinus />
          </button>
        </div>
      </td>

      <td className="w-[20%]">
        <strong>
          {formatPrice(
            item.cost.totalAmount.amount,
            item.cost.totalAmount.currencyCode,
          )}
        </strong>
      </td>
    </tr>
  );
}
