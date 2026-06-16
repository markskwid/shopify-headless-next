"use client";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { City, Country, State } from "country-state-city";
import { ADDRESS_TYPE } from "@/types/address";
export default function Modal({
  mode,
  isOpen,
  address,
}: {
  mode: "add" | "edit";
  isOpen: boolean;
  address: ADDRESS_TYPE | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const countries = Country.getAllCountries();
  const provinces = State.getStatesOfCountry(country);

  return (
    // overlay background of modal
    <div className="fixed inset-0 z-999999 w-full h-full bg-neutral-500/80 flex justify-center items-center">
      {/* form */}
      <form className="bg-white border border-gray-400 py-5 px-5 my-5 rounded-lg w-sm md:w-md">
        <h3 className="text-2xl font-bold mb-5">
          {mode === "add" ? "Add New Address" : "Edit Address"}
        </h3>
        {error && (
          <div className="w-full p-2 bg-red-500/50 mb-4 rounded-md flex justify-start items-center font-bold">
            <BiErrorCircle className="mr-2" /> {error}
          </div>
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
            className="border border-gray-600 mt-2 w-full p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start">
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

        {provinces.length > 0 && (
          <div className="flex flex-col justify-start items-start">
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

        <div className="text-end">
          <button
            className="bg-neutral-800 rounded-full py-3 px-6 font-semibold text-white text-center w-auto mt-5 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            Submit
          </button>

          <button
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
