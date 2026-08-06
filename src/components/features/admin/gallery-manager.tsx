"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { toast } from "sonner";
import {
  Copy,
  Folder,
  FolderPlus,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { joinKey, normalizePrefix } from "@/lib/gallery/path";
import type { AllowedImageType, GalleryEntry } from "@/lib/gallery/types";
import { EXT_TO_MIME } from "@/lib/gallery/types";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
};

const PAGE_LIMIT = 48;
const BUCKET_ROOT = "";

function sanitizeFileName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-()+ ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function contentTypeForFile(file: File): AllowedImageType | null {
  if (
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/gif" ||
    file.type === "image/avif"
  ) {
    return file.type;
  }
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) return null;
  return EXT_TO_MIME[ext] ?? null;
}

export function GalleryManager() {
  const [prefix, setPrefix] = useState(BUCKET_ROOT);
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [mkdirOpen, setMkdirOpen] = useState(false);
  const [mkdirName, setMkdirName] = useState("");
  const [mkdirBusy, setMkdirBusy] = useState(false);
  const [preview, setPreview] = useState<GalleryEntry | null>(null);
  const [pendingDelete, setPendingDelete] = useState<GalleryEntry | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const crumbs = useMemo(() => {
    const parts = prefix.split("/").filter(Boolean);
    const items: { label: string; path: string }[] = [
      { label: "root", path: BUCKET_ROOT },
    ];
    let acc = "";
    for (const part of parts) {
      acc = `${acc}${part}/`;
      items.push({ label: part, path: acc });
    }
    return items;
  }, [prefix]);

  const dirs = entries.filter((e) => e.type === "dir");
  const files = entries.filter((e) => e.type === "file");

  const loadEntries = useCallback(
    async (cursor: string | null, append: boolean) => {
      if (append) setLoadingMore(true);
      else setLoading(true);

      try {
        const params = new URLSearchParams({
          limit: String(PAGE_LIMIT),
        });
        if (prefix) params.set("prefix", prefix);
        if (cursor) params.set("cursor", cursor);
        const res = await fetch(`/api/gallery/list?${params}`);
        if (!res.ok) throw new Error("LIST_FAILED");
        const data = (await res.json()) as {
          entries: GalleryEntry[];
          nextCursor: string | null;
        };
        setEntries((prev) => (append ? [...prev, ...data.entries] : data.entries));
        setNextCursor(data.nextCursor);
      } catch {
        toast.error("Failed to load gallery");
        if (!append) setEntries([]);
      } finally {
        if (append) setLoadingMore(false);
        else setLoading(false);
      }
    },
    [prefix],
  );

  useEffect(() => {
    void loadEntries(null, false);
  }, [loadEntries]);

  const navigateTo = (next: string) => {
    try {
      setPrefix(normalizePrefix(next));
    } catch {
      setPrefix(BUCKET_ROOT);
    }
  };

  const handleMkdir = async () => {
    const name = mkdirName.trim().replace(/\/+/g, "");
    if (!name) return;
    setMkdirBusy(true);
    try {
      const path = joinKey(prefix, name);
      const res = await fetch("/api/gallery/mkdir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) throw new Error("MKDIR_FAILED");
      setMkdirOpen(false);
      setMkdirName("");
      toast.success("Folder created");
      await loadEntries(null, false);
    } catch {
      toast.error("Failed to create folder");
    } finally {
      setMkdirBusy(false);
    }
  };

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setUploadBusy(true);
    let ok = 0;
    let fail = 0;

    try {
      for (const file of Array.from(fileList)) {
        const contentType = contentTypeForFile(file);
        if (!contentType) {
          fail += 1;
          continue;
        }
        const safeName = sanitizeFileName(file.name);
        if (!safeName) {
          fail += 1;
          continue;
        }

        let key: string;
        try {
          key = joinKey(prefix, safeName);
        } catch {
          fail += 1;
          continue;
        }

        const presignRes = await fetch("/api/gallery/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, contentType }),
        });
        if (!presignRes.ok) {
          fail += 1;
          continue;
        }
        const { uploadUrl } = (await presignRes.json()) as {
          uploadUrl: string;
        };

        const putRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": contentType },
          body: file,
        });
        if (!putRes.ok) {
          fail += 1;
          continue;
        }
        ok += 1;
      }

      if (ok > 0) {
        toast.success(`Uploaded ${ok} image(s)`);
        await loadEntries(null, false);
      }
      if (fail > 0) {
        toast.error(`${fail} file(s) failed to upload`);
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const entry = pendingDelete;
    setDeleteBusy(true);
    try {
      const res = await fetch("/api/gallery/object", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: entry.key }),
      });
      if (!res.ok) throw new Error("DELETE_FAILED");
      toast.success("Deleted");
      setPendingDelete(null);
      if (preview?.key === entry.key) setPreview(null);
      await loadEntries(null, false);
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteBusy(false);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Gallery</h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage images in any R2 directory. Public site only lists{" "}
          <code className="text-xs">gallery/public/</code>.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <nav
          aria-label="Directory path"
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path} className="flex items-center gap-1">
                {index > 0 && <span className="opacity-50">/</span>}
                {isLast ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigateTo(crumb.path)}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMkdirOpen(true)}
            disabled={mkdirBusy}
          >
            <FolderPlus />
            New folder
          </Button>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadBusy}
          >
            {uploadBusy ? <Loader2 className="animate-spin" /> : <Upload />}
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            className="hidden"
            onChange={(e) => void handleUpload(e.target.files)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading…
        </div>
      ) : entries.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">This folder is empty.</p>
      ) : (
        <div className="space-y-6">
          {dirs.length > 0 && (
            <ul className="divide-y border-t">
              {dirs.map((dir) => (
                <li
                  key={dir.key}
                  className="group flex items-center justify-between gap-3 py-3"
                >
                  <button
                    type="button"
                    onClick={() => navigateTo(dir.key)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <Folder className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{dir.name}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete"
                    disabled={deleteBusy}
                    onClick={() => setPendingDelete(dir)}
                  >
                    <Trash2 className="text-muted-foreground hover:text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {files.length > 0 && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {files.map((file) => (
                <button
                  key={file.key}
                  type="button"
                  onClick={() => setPreview(file)}
                  className="mb-4 block w-full overflow-hidden rounded-lg text-left transition hover:opacity-90"
                >
                  <Image
                    src={file.url!}
                    alt={file.name}
                    width={1000}
                    height={1000}
                    unoptimized
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </button>
              ))}
            </Masonry>
          )}

          {nextCursor ? (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                disabled={loadingMore}
                onClick={() => void loadEntries(nextCursor, true)}
              >
                {loadingMore ? <Loader2 className="animate-spin" /> : null}
                Load more
              </Button>
            </div>
          ) : null}
        </div>
      )}

      <Dialog
        open={Boolean(preview)}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
          {preview && (
            <>
              <DialogHeader>
                <DialogTitle className="truncate">{preview.name}</DialogTitle>
                <DialogDescription className="break-all font-mono text-xs">
                  {preview.url}
                </DialogDescription>
              </DialogHeader>
              <div className="relative overflow-hidden rounded-lg bg-muted/40">
                <Image
                  src={preview.url!}
                  alt={preview.name}
                  width={1600}
                  height={1200}
                  unoptimized
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => void handleCopy(preview.url!)}
                >
                  <Copy />
                  Copy URL
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    disabled={deleteBusy}
                    onClick={() => setPendingDelete(preview)}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                  <Button variant="ghost" onClick={() => setPreview(null)}>
                    <X />
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteBusy) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &quot;{pendingDelete?.name}&quot;? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteBusy}
              onClick={() => void confirmDelete()}
            >
              {deleteBusy ? <Loader2 className="size-4 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={mkdirOpen} onOpenChange={setMkdirOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New folder</DialogTitle>
            <DialogDescription>
              Creates a folder in the current directory.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={mkdirName}
            onChange={(e) => setMkdirName(e.target.value)}
            placeholder="folder-name"
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleMkdir();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setMkdirOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={mkdirBusy || !mkdirName.trim()}
              onClick={() => void handleMkdir()}
            >
              {mkdirBusy ? <Loader2 className="animate-spin" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
}
