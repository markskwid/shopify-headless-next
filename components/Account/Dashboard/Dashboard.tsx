"use client";

import { useAuth } from "@/context/Auth";
import { ADDRESS_TYPE } from "@/types/address";
import { CUSTOMER_TYPE } from "@/types/customer";
import Address from "./Address";
import Order from "./Order";
import { CUSTOMER_ORDER_TYPE } from "@/types/order";
import Modal from "@/components/Modal";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard({
  customer,
}: {
  customer: CUSTOMER_TYPE | null;
}) {
  const { firstName, lastName } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddNewAddress = () => {
    setIsAdding(true);
    setIsOpen(true);
  };

  const handleEditAddress = () => {
    setIsAdding(false);
    setIsOpen(true);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="mt-4 font-semibold text-lg">
        Welcome back, {firstName} {lastName}!
      </p>
      <div className="mt-10">
        <h2 className="font-bold text-3xl">Addresses</h2>
        <div className="flex space-x-3">
          {customer?.addresses?.nodes &&
            customer.defaultAddress &&
            customer?.addresses?.nodes.map(
              (address: ADDRESS_TYPE, index: number) => (
                <Address
                  key={address.id}
                  address={address}
                  index={index}
                  defaultAddressId={customer.defaultAddress?.id}
                  clickToEdit={handleEditAddress}
                />
              ),
            )}
          <button
            onClick={handleAddNewAddress}
            className="border p-4 rounded-md mt-4 w-68 flex flex-col justify-center items-center cursor-pointer"
          >
            <AiOutlinePlus size={30} />
            <span className="text-xl font-semibold uppercase">Add New</span>
          </button>
        </div>
      </div>
      {
        //render customer orders if they exists
        customer?.orders?.nodes && (
          <div className="mt-10">
            <h2 className="font-bold text-3xl">Orders</h2>
            <div className="flex space-x-3">
              {customer.orders?.nodes.map((order: CUSTOMER_ORDER_TYPE) => (
                <Order key={order.id} order={order} />
              ))}
            </div>
          </div>
        )
      }

      {isOpen && <Modal isAdding={isAdding} isOpen={true} />}
    </div>
  );
}
