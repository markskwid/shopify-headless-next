import Item from "@/components/Cart/Item";
import ToggleDiscount from "@/components/Cart/ToggleDiscount";
import { PageWrapper } from "@/components/PageWrapper";
import { getCart } from "@/lib/shopify/api/cart";
import { formatPrice } from "@/utils/formatPricing";
import { cookies } from "next/headers";

export default async function Cart() {
  const cartId = (await cookies()).get("cartId")?.value as string;

  const cart = await getCart(cartId);

  if (!cart.success) {
    console.log("Error getting cart");
  }

  const isCartEmpty = !cart.data?.lines.nodes.length;

  console.log(cart);
  return (
    <PageWrapper>
      <>
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
        {!isCartEmpty ? (
          <>
            <table className="table-auto w-full border-collapse [&_td]:p-2 [&_td]:text-start [&_td]:align-top">
              <thead className="bg-neutral-600">
                <tr>
                  <td className="w-[25%] font-bold text-md uppercase text-white">
                    Item
                  </td>
                  <td className="w-[25%] font-bold text-md uppercase text-white">
                    Price
                  </td>
                  <td className="w-[25%] font-bold text-md uppercase text-white">
                    Quantity
                  </td>
                  <td className="w-[25%] font-bold text-md uppercase text-white">
                    Total
                  </td>
                </tr>
              </thead>

              <tbody>
                {cart.data?.lines.nodes.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </tbody>
            </table>
            <div className="w-full border-t border-neutral-400 mt-5 py-5 flex justify-end">
              <div className="w-sm">
                <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
                  <strong className="text-lg">Subtotal: </strong>
                  <span className="text-end">
                    {" "}
                    {formatPrice(
                      cart.data?.cost.subtotalAmount?.amount as string,
                      cart.data?.cost.subtotalAmount?.currencyCode as string,
                    )}
                  </span>
                </div>

                <ToggleDiscount />

                {cart.data?.discountCodes.length && (
                  <>
                    <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
                      <strong className="text-lg">Applied Codes: </strong>
                      <span className="text-end italic">
                        {cart.data.discountCodes[0].code}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
                      <strong className="text-lg">Grand Total: </strong>
                      <span className="text-end text-2xl font-bold">
                        {" "}
                        {formatPrice(
                          cart.data?.cost.totalAmount?.amount as string,
                          cart.data?.cost.totalAmount?.currencyCode as string,
                        )}
                      </span>
                    </div>
                  </>
                )}

                <div className="py-5">
                  <a
                    className="block text-white! font-semibold uppercase py-4 px-5 text-center w-full bg-neutral-500 rounded-full tracking-widest"
                    href={cart.data?.checkoutUrl}
                    aria-label="Checkout now"
                  >
                    Checkout Now
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2>Cart is empty</h2>
        )}
      </>
    </PageWrapper>
  );
}
