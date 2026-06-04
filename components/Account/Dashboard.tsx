"use client";

import { useAuth } from "@/context/Auth";
import { ADDRESS_TYPE } from "@/types/address";
import { CUSTOMER_TYPE } from "@/types/customer";
import { formatPrice } from "@/utils/formatPricing";

export default function Dashboard({
  customer,
}: {
  customer: CUSTOMER_TYPE | null;
}) {
  const { firstName, lastName } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="mt-4 font-semibold text-lg">
        Welcome back, {firstName} {lastName}!
      </p>
      {
        // render customer addresses if they exists
        customer?.addresses?.nodes && customer.defaultAddress && (
          <div className="mt-10">
            <h2 className="font-bold text-3xl">Addresses</h2>
            <div className="flex space-x-3">
              {customer.defaultAddress && (
                <div className="border p-4 rounded-md mt-4">
                  <h3 className="font-semibold text-xl">Default Address</h3>
                  <p>
                    {customer.defaultAddress.firstName}{" "}
                    {customer.defaultAddress.lastName}
                  </p>
                  <p>
                    {customer.defaultAddress.address1}{" "}
                    {customer.defaultAddress.address2}
                  </p>
                  <p>
                    {customer.defaultAddress.city},{" "}
                    {customer.defaultAddress.province},{" "}
                    {customer.defaultAddress.country}{" "}
                    {customer.defaultAddress.zip}
                  </p>
                  <p>{customer.defaultAddress.phone}</p>
                </div>
              )}

              {customer.addresses.nodes.map(
                (address: ADDRESS_TYPE, index: number) => (
                  <div className="border p-4 rounded-md mt-4" key={address.id}>
                    <h3 className="font-semibold text-xl">
                      Address {index + 1}
                    </h3>
                    <p>
                      {address.firstName} {address.lastName}
                    </p>
                    <p>
                      {address.address1} {address.address2}
                    </p>
                    <p>
                      {address.city}, {address.province}, {address.country}{" "}
                      {address.zip}
                    </p>
                    <p>{address.phone}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        )
      }
      {
        //render customer orders if they exists
        customer?.orders?.nodes && (
          <div className="mt-10">
            <h2 className="font-bold text-3xl">Orders</h2>
            <div className="flex space-x-3">
              {customer.orders.nodes.map((order) => (
                <div
                  className="border p-4 rounded-md mt-4 w-full md:w-[50%] lg:w-[30%]"
                  key={order.id}
                >
                  <span className={`rounded-full px-3 py-1 bg-neutral-500 mt-5 text-white! text-xs font-semibold`}>
                    {order.fulfillmentStatus}
                  </span>

                  <h3 className="font-semibold text-2xl my-2 pb-2 border-b border-neutral-400">
                    Order #{order.orderNumber}
                    <span className="text-sm mt-2 font-normal block">
                      This order is {order.financialStatus}
                    </span>
                  </h3>

                  {order.lineItems.nodes.map((item, index) => (
                    <div className="flex mb-4" key={item.title}>
                      <img
                        src={item.variant?.image?.url}
                        alt={item.variant?.image?.altText || item.title}
                        className="w-25 h-25 object-cover rounded-md bg-neutral-300"
                      />

                      <div className="px-4">
                        <p className="font-semibold">{item.title}</p>
                        <p>
                          {item.quantity} x{" "}
                          {formatPrice(
                            item.variant?.price.amount as string,
                            item.variant?.price.currencyCode as string,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}

                  <p className="grid grid-cols-2 mt-2 pt-2 border-t border-neutral-400 font-bold text-md">
                    <span className="mr-2 font-normal">Subtotal:</span>
                    <span className="text-end">
                      {" "}
                      {formatPrice(
                        order.subtotalPrice.amount,
                        order.subtotalPrice.currencyCode,
                      )}
                    </span>
                  </p>

                  {order.discountApplications?.nodes && (
                    <p className="grid grid-cols-2 font-bold text-md">
                      <span className="mr-2 font-normal">Discount:</span>
                      <span className="inline text-end">
                        {order.discountApplications.nodes.map((discount) => (
                          <span key={discount.code}>
                            {discount.code} (-{discount.value.percentage}%)
                          </span>
                        ))}
                      </span>
                    </p>
                  )}

                  {order.totalShippingPrice && (
                    <p className="grid grid-cols-2 font-bold text-md">
                      <span className="mr-2 font-normal">Shipping:</span>
                      <span className="text-end">
                        {formatPrice(
                          order.totalShippingPrice.amount,
                          order.totalShippingPrice.currencyCode,
                        )}
                      </span>
                    </p>
                  )}

                  {order.totalTax && (
                    <p className="grid grid-cols-2 font-bold text-md">
                      <span className="mr-2 font-normal">Shipping:</span>
                      <span className="text-end">
                        {formatPrice(
                          order.totalTax.amount,
                          order.totalTax.currencyCode,
                        )}
                      </span>
                    </p>
                  )}

                  <p className="grid grid-cols-2 font-bold text-md">
                    <span className="mr-2 font-normal">Total:</span>
                    <span className="text-end">
                      {formatPrice(
                        order.currentTotalPrice.amount,
                        order.currentTotalPrice.currencyCode,
                      )}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}
