"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AdminDashboardStats } from "@/types/admin";

export function RentalsStatusChart({ overview }: { overview: AdminDashboardStats["overview"] }) {
  const data = [
    { name: "Pending", value: overview.pendingRentals },
    { name: "Approved", value: overview.approvedRentals },
    { name: "Active", value: overview.activeRentals },
    { name: "Completed", value: overview.completedRentals },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Rentals by Status</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "var(--color-border)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
