"use client";

import { useAuth } from "@/context/Auth";

export default function Dashboard() {
  const { firstName, lastName } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="mt-4 font-semibold text-lg">
        Welcome back, {firstName} {lastName}!
      </p>
    </div>
  );
}
