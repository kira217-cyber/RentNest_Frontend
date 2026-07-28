"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { AdminDashboardStats } from "@/types/admin";

const COLORS = ["var(--color-primary)", "var(--color-accent)"];

export function UsersBreakdownChart({ overview }: { overview: AdminDashboardStats["overview"] }) {
  const data = [
    { name: "Tenants", value: overview.totalTenants },
    { name: "Landlords", value: overview.totalLandlords },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Tenants vs Landlords</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "var(--color-border)",
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
