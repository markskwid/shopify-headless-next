import SignUpForm from "@/components/Account/SignUpForm";
import { PageWrapper } from "@/components/PageWrapper";

export default function Login() {
  return (
    <PageWrapper>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="font-bold text-4xl text-center">Sign up</h1>
          <SignUpForm />
        </div>
      </div>
    </PageWrapper>
  );
}
