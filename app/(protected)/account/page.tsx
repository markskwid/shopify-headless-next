import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Dashboard from "@/components/Account/Dashboard";

export default async function Account() {
  return <Dashboard />;
}
