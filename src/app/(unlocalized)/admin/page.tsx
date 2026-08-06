import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { PostsTable } from "@/components/features/admin/posts-table";

export default function AdminPostsPage() {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Posts</h1>
        <PostsTable />
      </div>
    </AdminPageShell>
  );
}
