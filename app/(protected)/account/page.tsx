import Dashboard from "@/components/Account/Dashboard/Dashboard";
import { getCustomer } from "@/lib/shopify/api/customer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Account() {
  const token = (await cookies()).get("customerAccessToken")?.value;

  if (!token) redirect("/login");

  const customer = await getCustomer(token);

  if (!customer) redirect("/login");

  return <Dashboard customer={customer.data ?? null} />;
}
