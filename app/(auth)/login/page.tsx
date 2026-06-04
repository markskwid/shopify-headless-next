import LoginForm from "@/components/Account/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Login() {
  const token = (await cookies()).get("customerAccessToken")?.value;

  if (token) redirect("/account");

  return (
    <PageWrapper>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="font-bold text-4xl text-center">Login</h1>
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
}
