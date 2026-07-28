"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/password-input";
import { useAuth } from "@/hooks/use-auth";
import { dashboardPathForRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";

const ROLE_OPTIONS = [
  { value: "TENANT" as const, label: "Tenant", description: "I want to rent a home", icon: UserRound },
  { value: "LANDLORD" as const, label: "Landlord", description: "I want to list properties", icon: Building2 },
];

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isRegisterPending } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "", role: "TENANT" },
  });

  const [selectedRole, setSelectedRole] = useState<RegisterFormValues["role"]>("TENANT");

  async function onSubmit(values: RegisterFormValues) {
    try {
      const response = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || undefined,
        role: values.role,
      });
      router.push(dashboardPathForRole(response.data.user.role));
    } catch {
      // error toast already shown by useAuth
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
        <p className="mt-1 text-muted-foreground">Join RentNest as a tenant or landlord.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="I am a..." htmlFor="role" error={errors.role?.message} required>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedRole(option.value);
                  setValue("role", option.value, { shouldValidate: true });
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border p-4 text-center transition-colors",
                  selectedRole === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-background",
                )}
              >
                <option.icon
                  className={cn("size-5", selectedRole === option.value ? "text-primary" : "text-muted")}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Full name" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" autoComplete="name" hasError={Boolean(errors.name)} {...register("name")} />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            hasError={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message} hint="Optional">
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            hasError={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field label="Password" htmlFor="password" error={errors.password?.message} required>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            hasError={Boolean(errors.password)}
            {...register("password")}
          />
        </Field>

        <Field
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            hasError={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
        </Field>

        <Button type="submit" fullWidth loading={isRegisterPending}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
