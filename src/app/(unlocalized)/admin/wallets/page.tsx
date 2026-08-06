import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { WalletsManager } from "@/components/features/admin/wallets-manager";

export default function AdminWalletsPage() {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Wallets</h1>
        <WalletsManager />
      </div>
    </AdminPageShell>
  );
}
