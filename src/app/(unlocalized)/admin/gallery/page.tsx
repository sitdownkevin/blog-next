import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { GalleryManager } from "@/components/features/admin/gallery-manager";

export default function AdminGalleryPage() {
  return (
    <AdminPageShell>
      <GalleryManager />
    </AdminPageShell>
  );
}
