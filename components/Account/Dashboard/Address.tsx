"use client";
import { removeAddressAction } from "@/app/(address)/remove/action";
import { ADDRESS_TYPE } from "@/types/address";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function Address({
  address,
  defaultAddressId,
  index,
  onEdit,
}: {
  address: ADDRESS_TYPE;
  defaultAddressId?: string;
  index: number;
  onEdit(address: ADDRESS_TYPE): void;
}) {
  const handleDelete = async (id: string) => {
    const confirmation = window.confirm("Do you want to delete?");

    if (!confirmation) return;

    const res = await removeAddressAction(id);

    if (!res.success) {
      console.log("Something's wrong removing the address");
      return;
    }

    alert("Address deleted!");
  };

  return (
    <div
      className="border p-4 rounded-md mt-4 flex-[46%] lg:flex-[20%] grow-0"
      id={address.id}
      key={address.id}
    >
      <h3 className="font-semibold text-xl flex justify-between items-center mb-2">
        {defaultAddressId === address.id
          ? "Default Address"
          : `Address ${index + 1}`}

        <div>
          {defaultAddressId !== address.id && (
            <button
              className="cursor-pointer mr-3"
              onClick={() => handleDelete(address.id)}
            >
              <AiOutlineDelete />
            </button>
          )}

          <button className="cursor-pointer" onClick={() => onEdit(address)}>
            <AiOutlineEdit />
          </button>
        </div>
      </h3>

      <p>
        {address.firstName} {address.lastName}
      </p>
      {address.company && <p>{address.company}</p>}
      <p>
        {address.address1}, {address.address2}
      </p>
      <p>
        {address.city}, {address.province}, {address.country} {address.zip}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
