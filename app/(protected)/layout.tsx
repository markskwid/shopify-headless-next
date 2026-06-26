import { PageWrapper } from "@/components/PageWrapper";
import { AuthProvider } from "@/context/Auth";
import { getCustomer } from "@/lib/shopify/api/customer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("customerAccessToken")?.value;

  if (!token) redirect("/login");

  const customer = await getCustomer(token);

  if (!customer.data) redirect("/login");

  return (
    <AuthProvider
      initialState={{
        isLoggedIn: true,
        firstName: customer.data.firstName ?? null,
        lastName: customer.data.lastName ?? null,
        email: customer.data.email ?? null,
      }}
    >
      <PageWrapper>
        <>{children}</>
      </PageWrapper>
    </AuthProvider>
  );
}
