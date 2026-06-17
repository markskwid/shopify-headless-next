"use client";
import { useState } from "react";

import { ADDRESS_TYPE } from "@/types/address";
import { AiOutlineEdit } from "react-icons/ai";

export default function Address({
  address,
  defaultAddressId,
  index,
}: {
  address: ADDRESS_TYPE;
  defaultAddressId?: string;
  index: number;
}) {
  return (
    <div
      className="border p-4 rounded-md mt-4"
      id={address.id}
      key={address.id}
    >
      <h3 className="font-semibold text-xl flex justify-between items-center mb-2">
        {defaultAddressId === address.id
          ? "Default Address"
          : `Address ${index + 1}`}

        <button className="cursor-pointer">
          <AiOutlineEdit />
        </button>
      </h3>

      <p>
        {address.firstName} {address.lastName}
      </p>
      <p>
        {address.address1} {address.address2}
      </p>
      <p>
        {address.city}, {address.province}, {address.country} {address.zip}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
