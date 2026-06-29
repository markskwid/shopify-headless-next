import { PageWrapper } from "@/components/PageWrapper";
import { AuthProvider } from "@/context/Auth";
import { getCustomer } from "@/lib/shopify/api/customer";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("customerAccessToken")?.value || "";

  let customerData = null;

  if (token) {
    const customer = await getCustomer(token);

    if (customer.success && customer.data) {
      customerData = customer.data;
    }
  }

  return (
    <AuthProvider
      initialState={{
        isLoggedIn: !!customerData,
        firstName: customerData?.firstName ?? null,
        lastName: customerData?.lastName ?? null,
        email: customerData?.email ?? null,
      }}
    >
      <PageWrapper>
        <>{children}</>
      </PageWrapper>
    </AuthProvider>
  );
}
