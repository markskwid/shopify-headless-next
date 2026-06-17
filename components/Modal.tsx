"use client";
import { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { ADDRESS_TYPE } from "@/types/address";
import { getCountryCodeByName, getProvinceCodeByName } from "@/utils/country";
export default function Modal({
  mode,
  onClose,
  address,
}: {
  mode: "add" | "edit";
  address: ADDRESS_TYPE | null;
  onClose(): void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(
    getCountryCodeByName(address?.country ?? ""),
  );
  const [state, setState] = useState<string>(
    getProvinceCodeByName(country, address?.province ?? ""),
  );

  const countries = Country.getAllCountries();
  const provinces = State.getStatesOfCountry(country);

  // useEffect to lock the body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mode]);


  return (
    // overlay background of modal
    <div className="fixed inset-0 z-999999 w-full h-full bg-neutral-500/80 flex justify-center items-center">
      {/* form */}
      <form className="bg-white border border-gray-400 py-5 px-5 my-5 rounded-lg w-sm md:w-md">
        <div className="py-3 mb-2 border-b border-gray-200">
          <h3 className="text-2xl font-bold">
            {mode === "add" ? "Add New Address" : "Edit Address"}
          </h3>
        </div>

        <div className="overflow-y-auto py-2 flex-1 max-h-[50vh]">
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
              required
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
                  htmlFor="state"
                >
                  State/Province
                </label>
                <select
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  name="state"
                  id="state"
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
            <div className="flex flex-col justify-start items-start mb-5">
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

            <div className="flex flex-col justify-start items-start mb-5">
              <label
                className="text-sm font-semibold text-gray-500"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                defaultValue={address?.phone ?? ""}
                className="border border-gray-600 mt-2 w-full p-2 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="text-end border-t border-gray-300">
          <button
            className="bg-neutral-800 rounded-full py-3 px-6 font-semibold text-white text-center w-auto mt-5 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            Submit
          </button>

          <button
            onClick={onClose}
            type="button"
            className="text-black rounded-full border ml-2 py-3 px-6 font-semibold text-center w-auto mt-5 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
