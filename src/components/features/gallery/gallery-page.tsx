"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Copy, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryEntry } from "@/lib/gallery/types";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
};

const PAGE_LIMIT = 24;

export function GalleryPage() {
  const t = useTranslations("Gallery");
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [preview, setPreview] = useState<GalleryEntry | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);

  const loadPage = useCallback(
    async (cursor: string | null, append: boolean) => {
      if (append) {
        if (loadingMoreRef.current || !cursor) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const params = new URLSearchParams({ limit: String(PAGE_LIMIT) });
        if (cursor) params.set("cursor", cursor);
        const res = await fetch(`/api/gallery/public?${params}`);
        if (!res.ok) throw new Error("LIST_FAILED");
        const data = (await res.json()) as {
          entries: GalleryEntry[];
          nextCursor: string | null;
        };
        setEntries((prev) => (append ? [...prev, ...data.entries] : data.entries));
        setNextCursor(data.nextCursor);
      } catch {
        toast.error(t("errors.loadFailed"));
        if (!append) setEntries([]);
      } finally {
        if (append) {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [t],
  );

  useEffect(() => {
    void loadPage(null, false);
  }, [loadPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !nextCursor) return;

    const observer = new IntersectionObserver(
      (observed) => {
        if (observed.some((entry) => entry.isIntersecting)) {
          void loadPage(nextCursor, true);
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [nextCursor, loadPage]);

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

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-12">
          <Loader2 className="size-4 animate-spin" />
          {t("loading")}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12">{t("empty")}</p>
      ) : (
        <div className="space-y-6">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {entries.map((file) => (
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

          <div ref={sentinelRef} className="flex justify-center py-4">
            {loadingMore ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                {t("loadingMore")}
              </div>
            ) : nextCursor ? (
              <p className="text-xs text-muted-foreground">{t("scrollForMore")}</p>
            ) : (
              <p className="text-xs text-muted-foreground">{t("endOfList")}</p>
            )}
          </div>
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
                <Button variant="ghost" onClick={() => setPreview(null)}>
                  <X />
                  {t("close")}
                </Button>
              </DialogFooter>
            </>
          )}
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
