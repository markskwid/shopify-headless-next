"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) setStatus("success");
    else setStatus("error");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-start items-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border p-3 rounded-md bg-gray-200 border-gray-400"
        />
        <button
          type="submit"
          className="cursor-pointer p-3 px-6 ml-2 rounded-full bg-neutral-800 text-white font-semibold"
        >
          Subscribe
        </button>
      </form>
      <div className="text-left font-semibold py-2 px-1">
        {status === "success" && <p>Thank you for subscribing!</p>}
        {status === "error" && <p>Something went wrong. Try again.</p>}
      </div>
    </>
  );
}
