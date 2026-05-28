import { PageWrapper } from "@/components/PageWrapper";
import { getCustomer } from "@/lib/shopify/api/customer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("customerAccessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  const customer = await getCustomer(token);

  if (!customer) redirect("/");

  return (
    <PageWrapper>
      <>{children}</>
    </PageWrapper>
  );
}
