"use client";
import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { ADDRESS_TYPE } from "@/types/address";
import {
  getCountryCodeByName,
  getCountryNameByCode,
  getProvinceCodeByName,
  getProvinceNameByCode,
} from "@/utils/country";
import { updateAddressAction } from "@/app/(address)/update/action";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { createAddressAction } from "@/app/(address)/create/action";
export default function Modal({
  mode,
  onClose,
  address,
  defaultAddressId,
}: {
  mode: "add" | "edit";
  defaultAddressId: string | null;
  address: ADDRESS_TYPE | null;
  onClose(): void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(
    getCountryCodeByName(address?.country ?? ""),
  );
  const [province, setProvince] = useState<string>(
    getProvinceCodeByName(country, address?.province ?? ""),
  );

  const countries = Country.getAllCountries();
  const provinces = State.getStatesOfCountry(country);
  const selectedCountry = Country.getCountryByCode(country);

  // useEffect to lock the body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mode]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const countryName = getCountryNameByCode(country);
    const provinceName = getProvinceNameByCode(country, province);

    formData.set("country", countryName);
    formData.set("province", provinceName);

    const res =
      mode === "edit"
        ? await updateAddressAction(formData)
        : await createAddressAction(formData);

    if (!res.success) {
      setError("Failed to update the address. Please try again");
      return;
    }

    setLoading(false);
    onClose();
  };

  return (
    // overlay background of modal
    <div className="fixed inset-0 z-999999 w-full h-full bg-neutral-500/80 flex justify-center items-center">
      {/* form */}
      {loading ? (
        <>
          <AiOutlineLoading size={50} className="animate-spin" />
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-400 py-5 px-5 my-5 rounded-lg w-sm md:w-md"
        >
          <div className="pb-3 mb-2 border-b border-gray-200">
            <h3 className="text-2xl font-bold">
              {mode === "add" ? "Add New Address" : "Edit Address"}
            </h3>

            {error && (
              <div className="w-full p-2 bg-red-500/50 mb-4 rounded-md flex justify-start items-center font-bold">
                <BiErrorCircle className="mr-2" /> {error}
              </div>
            )}
          </div>

          <div className="overflow-y-auto py-2 flex-1 max-h-[50vh]">
            {address && (
              <input
                defaultValue={address?.id}
                id="addressId"
                name="addressId"
                hidden
              />
            )}
            <div className="flex space-x-2">
              <div className="flex flex-col justify-start items-start mb-5">
                <label
                  className="text-sm font-semibold text-gray-500"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  defaultValue={address?.firstName ?? ""}
                  className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col justify-start items-start mb-5">
                <label
                  className="text-sm font-semibold text-gray-500"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  defaultValue={address?.lastName ?? ""}
                  className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start mb-5">
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="company"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                defaultValue={address?.company ?? ""}
                name="company"
                className="border border-gray-600 mt-2 w-full p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col justify-start items-start mb-5">
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="addressLine1"
              >
                Address Line 1
              </label>
              <input
                type="addressLine1"
                id="addressLine1"
                name="addressLine1"
                defaultValue={address?.address1 ?? ""}
                className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col justify-start items-start mb-5">
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="addressLine2"
              >
                Apartment, suite, etc.
              </label>
              <input
                type="addressLine2"
                id="addressLine2"
                name="addressLine2"
                defaultValue={address?.address2 ?? ""}
                className="border border-gray-600 mt-2 w-full p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col justify-start items-start mb-5">
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="country"
              >
                Country
              </label>
              <select
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                name="country"
                id="country"
                className="border border-gray-600 mt-2 w-full p-2 rounded-md"
              >
                {countries.length > 0 &&
                  countries.map((country) => (
                    <option value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex space-x-2 mb-5">
              {provinces.length > 0 && (
                <div className="flex flex-col justify-start items-start flex-1">
                  <label
                    className="text-sm font-semibold text-gray-500"
                    htmlFor="province"
                  >
                    State/Province
                  </label>
                  <select
                    onChange={(e) => setProvince(e.target.value)}
                    value={province}
                    name="province"
                    id="province"
                    className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                  >
                    {provinces.map((province) => (
                      <option key={province.isoCode} value={province.isoCode}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col justify-start items-start flex-1">
                <label
                  className="text-sm font-semibold text-gray-500"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={address?.city ?? ""}
                  className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex flex-col justify-start items-start">
                <label
                  className="text-sm font-semibold text-gray-500"
                  htmlFor="zip"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  defaultValue={address?.zip ?? ""}
                  className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex flex-col justify-start items-start">
                <label
                  className="text-sm font-semibold text-gray-500"
                  htmlFor="phone"
                >
                  Phone Number
                </label>

                <div className="flex justify-between items-center space-x-2 relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={15}
                    defaultValue={
                      address?.phone?.replace(
                        `+${selectedCountry?.phonecode}`,
                        "",
                      ) ?? ""
                    }
                    className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center mb-5 mt-2">
              <input
                type="checkbox"
                className="w-6"
                defaultChecked={defaultAddressId === address?.id ? true : false}
                name="defaultAddress"
                id="defaultAddress"
                value="true"
              />
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="defaultAddress"
              >
                Make as default address
              </label>
            </div>
          </div>

          <div className="text-end border-t border-gray-300">
            <button
              className={`bg-neutral-800 rounded-full py-3 px-6 font-semibold text-white text-center w-auto mt-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              type="submit"
              disabled={loading}
            >
              Submit
            </button>

            <button
              onClick={onClose}
              type="button"
              className={`text-black rounded-full border ml-2 py-3 px-6 font-semibold text-center w-auto mt-5 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
