import { RegisterForm } from "@/components/auth/register-form";
import { Container } from "@/components/common/container";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <Container className="py-16">
      <RegisterForm />
    </Container>
  );
}
