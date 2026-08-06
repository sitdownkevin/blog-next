"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AdminMdxEditor } from "@/components/features/admin/mdx-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SLUG_PATTERN } from "@/lib/posts/slug";

type PostEditorProps = {
  mode: "create" | "edit";
  initialSlug?: string;
};

type FormState = {
  slug: string;
  title: string;
  tags: string;
  description: string;
  create_date: string;
  update_date: string;
  pinned: boolean;
  hidden: boolean;
  content: string;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  tags: "",
  description: "",
  create_date: "",
  update_date: "",
  pinned: false,
  hidden: false,
  content: "",
};

export function PostEditor({ mode, initialSlug }: PostEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [editorKey, setEditorKey] = useState(
    mode === "create" ? "new" : `edit:${initialSlug ?? ""}`,
  );

  useEffect(() => {
    if (mode !== "edit" || !initialSlug) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/admin/posts/${encodeURIComponent(initialSlug)}`,
        );
        if (!res.ok) throw new Error("Load failed");
        const data = (await res.json()) as {
          slug: string;
          title: string;
          tags: string[];
          description?: string;
          create_date: string | null;
          update_date: string | null;
          pinned: boolean;
          hidden: boolean;
          content: string;
        };
        if (cancelled) return;
        setForm({
          slug: data.slug,
          title: data.title,
          tags: data.tags.join(", "),
          description: data.description ?? "",
          create_date: data.create_date ?? "",
          update_date: data.update_date ?? "",
          pinned: data.pinned,
          hidden: data.hidden,
          content: data.content,
        });
        setEditorKey(`edit:${data.slug}:${Date.now()}`);
      } catch {
        toast.error("Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, initialSlug]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const slug = form.slug.trim();
    if (!SLUG_PATTERN.test(slug)) {
      toast.error("Slug must be kebab-case (a-z, 0-9, hyphens)");
      return;
    }
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const body = {
        slug,
        title: form.title.trim(),
        tags: form.tags,
        description: form.description || undefined,
        pinned: form.pinned,
        hidden: form.hidden,
        content: form.content,
      };

      const res =
        mode === "create"
          ? await fetch("/api/admin/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
          : await fetch(
              `/api/admin/posts/${encodeURIComponent(initialSlug!)}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              },
            );

      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(err?.error || "Save failed");
      }

      const data = (await res.json()) as {
        slug: string;
        create_date?: string;
        update_date?: string;
      };

      setForm((prev) => ({
        ...prev,
        slug: data.slug,
        create_date: data.create_date ?? prev.create_date,
        update_date: data.update_date ?? prev.update_date,
      }));

      toast.success(mode === "create" ? "Created" : "Saved");

      if (mode === "edit" && data.slug !== initialSlug) {
        router.replace(`/admin/${encodeURIComponent(data.slug)}/edit`);
      } else {
        router.push(`/admin/${encodeURIComponent(data.slug)}/edit`);
      }
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Loading…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="my-post-slug"
          />
          <p className="text-xs text-muted-foreground">
            Changing the slug changes the public URL (sha256 of slug).
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>
        <div className="space-y-1 text-sm">
          <div className="text-muted-foreground">Created</div>
          <div>{form.create_date || (mode === "create" ? "Set on create" : "—")}</div>
        </div>
        <div className="space-y-1 text-sm">
          <div className="text-muted-foreground">Updated</div>
          <div>{form.update_date || (mode === "create" ? "Set on create" : "—")}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.hidden}
            onCheckedChange={(v) => update("hidden", v === true)}
          />
          Hidden
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={form.pinned}
            onCheckedChange={(v) => update("pinned", v === true)}
          />
          Pinned
        </label>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <AdminMdxEditor
          editorKey={editorKey}
          markdown={form.content}
          onChange={(markdown) => update("content", markdown)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </div>
    </div>
  );
}
