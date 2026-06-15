"use client";

import { useAuth } from "@/context/Auth";
import { ADDRESS_TYPE } from "@/types/address";
import { CUSTOMER_TYPE } from "@/types/customer";
import { formatPrice } from "@/utils/formatPricing";
import Address from "./Address";
import Order from "./Order";
import { CUSTOMER_ORDER_TYPE } from "@/types/order";

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
              {customer.addresses.nodes.map(
                (address: ADDRESS_TYPE, index: number) => (
                  <Address
                    key={address.id}
                    address={address}
                    index={index}
                    defaultAddressId={customer.defaultAddress?.id}
                  />
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
              {customer.orders?.nodes.map((order: CUSTOMER_ORDER_TYPE) => (
                <Order order={order} />
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}
