import Dashboard from "@/components/Account/Dashboard/Dashboard";
import { getCustomer } from "@/lib/shopify/api/customer";
import { cookies } from "next/headers";

export default async function Account() {
  const token = (await cookies()).get("customerAccessToken")?.value;
  let customerData = null;

  if (token) {
    const customer = await getCustomer(token);

    if (customer.success && customer.data) {
      customerData = customer.data;
    }
  }

  return <Dashboard customer={customerData ?? null} />;
}
