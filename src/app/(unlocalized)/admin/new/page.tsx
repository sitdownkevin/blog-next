import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { PostEditor } from "@/components/features/admin/post-editor";

export default function AdminNewPostPage() {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">New post</h1>
        <PostEditor mode="create" />
      </div>
    </AdminPageShell>
  );
}
