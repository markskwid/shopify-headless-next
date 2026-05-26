"use client";
import { loginAction } from "@/app/(auth)/login/actions";
import { formatLoginError } from "@/utils/formatLoginError";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

export default function LoginForm() {
  //states
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email as string);
    formData.append("password", password as string);

    //send response to action
    const response = await loginAction(formData);

    if (!response?.success) {
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
      <div className="flex flex-col justify-start items-start mb-5">
        {error && (
          <div className="w-full p-2 bg-red-500/50 mb-4 rounded-md flex justify-start items-center font-bold">
            <BiErrorCircle className="mr-2" /> {error}
          </div>
        )}
        <label className="text-sm font-semibold text-gray-500" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Logging in..." : "Submit"}
      </button>

      <Link href={"/register"} className="block mt-5 text-center underline">
        Create an account
      </Link>
    </form>
  );
}
