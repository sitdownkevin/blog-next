"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Copy,
  Folder,
  FolderPlus,
  Loader2,
  Trash2,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import type { Address } from "viem";

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
import { useRouter } from "@/i18n/navigation";
import {
  connectWallet,
  fetchGallerySession,
  logoutGallerySession,
  signInWithEthereum,
} from "@/lib/gallery/client-auth";
import { joinKey, normalizePrefix } from "@/lib/gallery/path";
import type { AllowedImageType, GalleryEntry } from "@/lib/gallery/types";
import { EXT_TO_MIME } from "@/lib/gallery/types";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
};

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

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

export function GalleryPage() {
  const t = useTranslations("Gallery");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathParam = searchParams.get("path") ?? "";

  const prefix = useMemo(() => {
    try {
      return normalizePrefix(pathParam);
    } catch {
      return "";
    }
  }, [pathParam]);

  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<Address | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [mkdirOpen, setMkdirOpen] = useState(false);
  const [mkdirName, setMkdirName] = useState("");
  const [mkdirBusy, setMkdirBusy] = useState(false);
  const [preview, setPreview] = useState<GalleryEntry | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const crumbs = useMemo(() => {
    const parts = prefix.split("/").filter(Boolean);
    const items: { label: string; path: string }[] = [
      { label: t("root"), path: "" },
    ];
    let acc = "";
    for (const part of parts) {
      acc = `${acc}${part}/`;
      items.push({ label: part, path: acc });
    }
    return items;
  }, [prefix, t]);

  const dirs = entries.filter((e) => e.type === "dir");
  const files = entries.filter((e) => e.type === "file");
  const isAdmin = Boolean(address);

  const setPath = useCallback(
    (next: string) => {
      const normalized = next ? normalizePrefix(next) : "";
      if (!normalized) {
        router.replace("/about/gallery");
        return;
      }
      router.replace(`/about/gallery?path=${encodeURIComponent(normalized)}`);
    },
    [router],
  );

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/gallery/list?prefix=${encodeURIComponent(prefix)}`,
      );
      if (!res.ok) {
        throw new Error("LIST_FAILED");
      }
      const data = (await res.json()) as { entries: GalleryEntry[] };
      setEntries(data.entries);
    } catch {
      toast.error(t("errors.loadFailed"));
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [prefix, t]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    void fetchGallerySession().then(setAddress);
  }, []);

  const handleConnect = async () => {
    setAuthBusy(true);
    try {
      const wallet = await connectWallet();
      const session = await signInWithEthereum(wallet);
      setAddress(session);
      toast.success(t("signedIn"));
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "NO_WALLET") {
        toast.error(t("errors.noWallet"));
      } else if (code === "NOT_ALLOWED") {
        toast.error(t("errors.notAllowed"));
      } else {
        toast.error(t("errors.signInFailed"));
      }
    } finally {
      setAuthBusy(false);
    }
  };

  const handleLogout = async () => {
    setAuthBusy(true);
    try {
      await logoutGallerySession();
      setAddress(null);
      toast.success(t("signedOut"));
    } catch {
      toast.error(t("errors.signOutFailed"));
    } finally {
      setAuthBusy(false);
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
      if (!res.ok) {
        throw new Error("MKDIR_FAILED");
      }
      setMkdirOpen(false);
      setMkdirName("");
      toast.success(t("dirCreated"));
      await loadEntries();
    } catch {
      toast.error(t("errors.mkdirFailed"));
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
          publicUrl: string;
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
        toast.success(t("uploadSuccess", { count: ok }));
        await loadEntries();
      }
      if (fail > 0) {
        toast.error(t("errors.uploadPartial", { count: fail }));
      }
    } catch {
      toast.error(t("errors.uploadFailed"));
    } finally {
      setUploadBusy(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (entry: GalleryEntry) => {
    if (!window.confirm(t("confirmDelete", { name: entry.name }))) {
      return;
    }
    setDeleteBusy(true);
    try {
      const res = await fetch("/api/gallery/object", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: entry.key }),
      });
      if (!res.ok) {
        throw new Error("DELETE_FAILED");
      }
      toast.success(t("deleted"));
      if (preview?.key === entry.key) {
        setPreview(null);
      }
      await loadEntries();
    } catch {
      toast.error(t("errors.deleteFailed"));
    } finally {
      setDeleteBusy(false);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("copied"));
    } catch {
      toast.error(t("errors.copyFailed"));
    }
  };

  return (
    <div className="w-full py-8 px-4 space-y-6">
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <nav
          aria-label={t("breadcrumb")}
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path || "root"} className="flex items-center gap-1">
                {index > 0 && <span className="opacity-50">/</span>}
                {isLast ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPath(crumb.path)}
                    className="hover:text-claude-orange transition-colors duration-300"
                  >
                    {crumb.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          {isAdmin ? (
            <>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {shortAddress(address!)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMkdirOpen(true)}
                disabled={mkdirBusy}
              >
                <FolderPlus />
                {t("newFolder")}
              </Button>
              <Button
                size="sm"
                className="bg-claude-orange text-white hover:bg-claude-orange/90"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadBusy}
              >
                {uploadBusy ? <Loader2 className="animate-spin" /> : <Upload />}
                {t("upload")}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                multiple
                className="hidden"
                onChange={(e) => void handleUpload(e.target.files)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void handleLogout()}
                disabled={authBusy}
              >
                {t("disconnect")}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleConnect()}
              disabled={authBusy}
            >
              {authBusy ? <Loader2 className="animate-spin" /> : <Wallet />}
              {t("connect")}
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-12">
          <Loader2 className="size-4 animate-spin" />
          {t("loading")}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12">{t("empty")}</p>
      ) : (
        <div className="space-y-6">
          {dirs.length > 0 && (
            <ul className="divide-y divide-border border-t border-border">
              {dirs.map((dir) => (
                <li
                  key={dir.key}
                  className="group flex items-center justify-between gap-3 py-3"
                >
                  <button
                    type="button"
                    onClick={() => setPath(dir.key)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <Folder className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate font-display text-base sm:text-lg group-hover:text-claude-orange transition-colors duration-300">
                      {dir.name}
                    </span>
                  </button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={t("delete")}
                      disabled={deleteBusy}
                      onClick={() => void handleDelete(dir)}
                    >
                      <Trash2 className="text-muted-foreground hover:text-destructive" />
                    </Button>
                  )}
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
                  className="mb-4 block w-full overflow-hidden rounded-lg transition duration-300 hover:opacity-90 text-left"
                >
                  <Image
                    src={file.url!}
                    alt={file.name}
                    width={1000}
                    height={1000}
                    unoptimized
                    className="h-auto w-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </Masonry>
          )}
        </div>
      )}

      <Dialog
        open={Boolean(preview)}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent
          className="sm:max-w-2xl"
          showCloseButton={false}
        >
          {preview && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display truncate">
                  {preview.name}
                </DialogTitle>
                <DialogDescription className="font-mono text-xs break-all">
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
                  {t("copyUrl")}
                </Button>
                <div className="flex gap-2">
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      disabled={deleteBusy}
                      onClick={() => void handleDelete(preview)}
                    >
                      <Trash2 />
                      {t("delete")}
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => setPreview(null)}>
                    <X />
                    {t("close")}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={mkdirOpen} onOpenChange={setMkdirOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("newFolder")}</DialogTitle>
            <DialogDescription>{t("newFolderHint")}</DialogDescription>
          </DialogHeader>
          <Input
            value={mkdirName}
            onChange={(e) => setMkdirName(e.target.value)}
            placeholder={t("folderNamePlaceholder")}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleMkdir();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setMkdirOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              className="bg-claude-orange text-white hover:bg-claude-orange/90"
              disabled={mkdirBusy || !mkdirName.trim()}
              onClick={() => void handleMkdir()}
            >
              {mkdirBusy ? <Loader2 className="animate-spin" /> : null}
              {t("create")}
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
