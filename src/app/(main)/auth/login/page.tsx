import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/common/container";

export const metadata = {
  title: "Log In",
};

export default function LoginPage() {
  return (
    <Container className="py-16">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </Container>
  );
}
