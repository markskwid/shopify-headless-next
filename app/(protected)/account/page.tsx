import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Account() {
  const token = (await cookies()).get("customerAccessToken")?.value;

  if (!token) redirect("/login");

  return (
    <div>
      <h1>My Account</h1>
    </div>
  );
}
