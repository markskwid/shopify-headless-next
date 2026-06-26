"use client";

import { ADDRESS_TYPE } from "@/types/address";
import { CUSTOMER_TYPE } from "@/types/customer";
import Address from "./Address";
import Order from "./Order";
import { CUSTOMER_ORDER_TYPE } from "@/types/order";
import Modal from "@/components/Modal";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { logoutAction } from "@/app/(auth)/logout/actions";
import { useRouter } from "next/navigation";

type MODAL_STATE = {
  isOpen: boolean;
  mode: "add" | "edit";
  address: ADDRESS_TYPE | null;
  defaultAddressId: string | null;
};

export default function Dashboard({
  customer,
}: {
  customer: CUSTOMER_TYPE | null;
}) {
  const router = useRouter();
  const [modalState, setModalState] = useState<MODAL_STATE>({
    isOpen: false,
    mode: "add",
    address: null,
    defaultAddressId: null,
  });

  const firstName = customer?.firstName;
  const lastName = customer?.lastName;

  const handleLogout = async () => {
    const res = await logoutAction();

    if (res.success) {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-5">My Account</h1>
        <button
          onClick={() => handleLogout()}
          className="p-2 min-w-22 bg-neutral-600 rounded-full font-bold text-white! cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="p-5 rounded-md bg-neutral-500 min-h-22 flex flex-col md:flex-row md:justify-start md:items-center">
        <p className="font-semibold text-lg text-white!">
          Welcome back,{" "}
          <span className="block text-3xl text-white!">
            {firstName} {lastName}!
          </span>
        </p>

        <div className="mt-5 md:mt-0 md:ml-auto flex space-x-3">
          <div className="rounded-md bg-neutral-300 p-5 min-w-32">
            <p className="font-bold text-center text-2xl">
              {customer?.addresses?.nodes.length}
              <span className="block text-sm font-normal">Addresses</span>
            </p>
          </div>

          <div className="rounded-md bg-neutral-300 p-5 min-w-32">
            <p className="font-bold text-center text-2xl">
              {customer?.orders?.nodes.length}
              <span className="block text-sm font-normal">Orders</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-3xl">Addresses</h2>
        <div className="flex space-x-3 flex-wrap">
          {customer?.addresses?.nodes &&
            customer.defaultAddress &&
            customer?.addresses?.nodes
              .sort((a, b) => {
                if (a.id === customer.defaultAddress?.id) return -1;
                if (b.id === customer.defaultAddress?.id) return 1;
                return 0;
              })
              .map((address: ADDRESS_TYPE, index: number) => (
                <Address
                  key={address.id}
                  address={address}
                  index={index}
                  defaultAddressId={customer.defaultAddress?.id}
                  onEdit={() =>
                    setModalState({
                      isOpen: true,
                      mode: "edit",
                      address: address,
                      defaultAddressId: customer.defaultAddress?.id as string,
                    })
                  }
                />
              ))}
          {customer?.addresses?.nodes.length != 5 && (
            <button
              onClick={() =>
                setModalState({
                  isOpen: true,
                  mode: "add",
                  address: null,
                  defaultAddressId: null,
                })
              }
              className="border p-4 rounded-md mt-4 flex-[46%] lg:flex-[20%] grow-0 min-h-52 flex flex-col justify-center items-center cursor-pointer"
            >
              <AiOutlinePlus size={30} />
              <span className="text-xl font-semibold uppercase">Add New</span>
            </button>
          )}
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
          defaultAddressId={modalState.defaultAddressId}
          mode={modalState.mode}
          address={modalState.address}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}
