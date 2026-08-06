"use client";

import { AdminAuthGate } from "@/components/features/admin/admin-auth-gate";
import { AdminNav } from "@/components/features/admin/admin-nav";

export function AdminPageShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <AdminNav />
      <div className="mt-6">{children}</div>
    </AdminAuthGate>
  );
}
