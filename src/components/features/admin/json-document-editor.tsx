"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type JsonDocumentEditorProps = {
  title: string;
  description: string;
  objectKey: string;
  apiPath: string;
};

export function JsonDocumentEditor({
  title,
  description,
  objectKey,
  apiPath,
}: JsonDocumentEditorProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as { document: unknown };
      setText(JSON.stringify(data.document, null, 2));
    } catch {
      toast.error(`Failed to load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [apiPath, title]);

  useEffect(() => {
    void load();
  }, [load]);

  function handleFormat() {
    try {
      const parsed = JSON.parse(text) as unknown;
      setText(JSON.stringify(parsed, null, 2));
      toast.success("Formatted");
    } catch {
      toast.error("Invalid JSON");
    }
  }

  async function handleSave() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      toast.error("Invalid JSON");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(apiPath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(err?.error || "Save failed");
      }
      const data = (await res.json()) as { document: unknown };
      setText(JSON.stringify(data.document, null, 2));
      toast.success(`${title} updated`);
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
        Loading {title.toLowerCase()}…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        <code className="text-xs text-muted-foreground">{objectKey}</code>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="min-h-112 font-mono text-xs leading-relaxed"
      />

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleFormat} disabled={saving}>
          Format
        </Button>
        <Button variant="outline" onClick={() => void load()} disabled={saving}>
          Reload
        </Button>
        <Button onClick={() => void handleSave()} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          Save
        </Button>
      </div>
    </div>
  );
}
