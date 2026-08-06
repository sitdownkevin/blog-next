import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { PostEditor } from "@/components/features/admin/post-editor";

type Props = {
  params: Promise<{ slug: string }>;
};

function EditorFallback() {
  return (
    <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      Loading…
    </div>
  );
}

async function EditPostEditor({ params }: Props) {
  const { slug } = await params;
  return <PostEditor mode="edit" initialSlug={decodeURIComponent(slug)} />;
}

export default function AdminEditPostPage({ params }: Props) {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Edit post</h1>
        <Suspense fallback={<EditorFallback />}>
          <EditPostEditor params={params} />
        </Suspense>
      </div>
    </AdminPageShell>
  );
}
