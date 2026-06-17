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

type MODAL_STATE = {
  isOpen: boolean;
  mode: "add" | "edit";
  address: ADDRESS_TYPE | null;
};

export default function Dashboard({
  customer,
}: {
  customer: CUSTOMER_TYPE | null;
}) {
  const { firstName, lastName } = useAuth();
  const [modalState, setModalState] = useState<MODAL_STATE>({
    isOpen: false,
    mode: "add",
    address: null,
  });

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
                />
              ),
            )}
          <button
            onClick={() =>
              setModalState({ isOpen: true, mode: "add", address: null })
            }
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

      {modalState.isOpen && (
        <Modal
          key={modalState.address?.id ?? "new"}
          mode={modalState.mode}
          isOpen={modalState.isOpen}
          address={modalState.address}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}
