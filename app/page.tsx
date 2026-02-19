import { createCustomer } from "@/lib/shopify/api/customer";

export default async function Home() {
  const customer = await createCustomer({
    email: "mark123@gmail.com",
    password: "testing12345",
  });

  console.log(customer);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Test</h1>
    </div>
  );
}
