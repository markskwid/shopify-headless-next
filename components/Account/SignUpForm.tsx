"use client";
import { registerThenLoginAction } from "@/app/(auth)/register/action";
import { formatLoginError } from "@/utils/formatLoginError";
import Link from "next/link";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface SIGN_UP_FORM {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<SIGN_UP_FORM>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);


    //send response to action
    const response = await registerThenLoginAction(formData);

    if (!response?.success) {
      console.log(response.errors);
      setError(formatLoginError(response?.errors));
    } else {
      setError(null);
    }

    setLoading(false);
  };
  return (
    <form
      className="border border-gray-400 py-5 px-5 my-5 rounded-lg w-sm md:w-md"
      onSubmit={handleSubmit}
    >
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
            value={form.firstName ?? ""}
            onChange={handleChange}
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
            value={form.lastName ?? ""}
            onChange={handleChange}
            className="border border-gray-600 mt-2 w-full p-2 rounded-md"
            required
          />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start mb-5">
        <label className="text-sm font-semibold text-gray-500" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email ?? ""}
          onChange={handleChange}
          className="border border-gray-600 mt-2 w-full p-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col justify-start items-start">
        <label
          className="text-sm font-semibold text-gray-500"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={form.password ?? ""}
          onChange={handleChange}
          name="password"
          className="border border-gray-600 mt-2 w-full p-2 rounded-md"
          required
        />
      </div>

      <button
        className="bg-neutral-800 rounded-md p-3 font-semibold text-white text-center w-full mt-5 cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Submit"}
      </button>

      <Link href={"/login"} className="block mt-5 text-center underline">
        Sign in now
      </Link>
    </form>
  );
}
