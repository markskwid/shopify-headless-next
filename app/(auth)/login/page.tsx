import LoginForm from "@/components/Account/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";

export default function Login() {
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
