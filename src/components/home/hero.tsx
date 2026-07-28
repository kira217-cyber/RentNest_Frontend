"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/forms/input";

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Rental marketplace for tenants &amp; landlords
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find &amp; List Rental Properties with{" "}
          <span className="text-primary">Ease</span>
        </h1>

        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          RentNest connects tenants with verified rental homes and gives landlords a clean
          dashboard to manage listings, requests, and payments.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
            <Input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Search by location, e.g. Dhaka"
              aria-label="Search by location"
              className="h-11 border-0 px-0 focus:ring-0"
            />
          </div>
          <Button type="submit" size="lg">
            Search Properties
          </Button>
        </form>
      </div>
    </section>
  );
}
