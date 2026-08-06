import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { JsonDocumentEditor } from "@/components/features/admin/json-document-editor";
import { RESUME_KEY } from "@/lib/resume/r2-store";

export default function AdminResumePage() {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Resume</h1>
        <JsonDocumentEditor
          title="Resume"
          description="Full bilingual resume JSON for /about/resume. Top-level keys must be en and zh."
          objectKey={RESUME_KEY}
          apiPath="/api/admin/resume"
        />
      </div>
    </AdminPageShell>
  );
}
