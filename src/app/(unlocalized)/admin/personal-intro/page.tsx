import { AdminPageShell } from "@/components/features/admin/admin-page-shell";
import { JsonDocumentEditor } from "@/components/features/admin/json-document-editor";
import { PERSONAL_INTRO_KEY } from "@/lib/personal-intro/r2-store";

export default function AdminPersonalIntroPage() {
  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Personal intro</h1>
        <JsonDocumentEditor
          title="Personal intro"
          description="Homepage personal intro JSON. Keys: abstract, education, workingExp, projects, publications (each with en/zh)."
          objectKey={PERSONAL_INTRO_KEY}
          apiPath="/api/admin/personal-intro"
        />
      </div>
    </AdminPageShell>
  );
}
