"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AdminPost = {
  slug: string;
  id: string;
  title: string;
  tags: string[];
  hidden: boolean;
  pinned: boolean;
  create_date: string | null;
  update_date: string | null;
};

export function PostsTable() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminPost | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (!res.ok) throw new Error("Failed to load");
      const data = (await res.json()) as { posts: AdminPost[] };
      setPosts(data.posts);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const slug = pendingDelete.slug;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted");
      setPendingDelete(null);
      await load();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Loading posts…
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="py-12 text-sm text-muted-foreground">
        No posts yet.{" "}
        <Link href="/admin/new" className="underline">
          Create one
        </Link>
        .
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.slug}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="font-mono text-xs">{post.slug}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {post.hidden ? (
                    <Badge variant="secondary">hidden</Badge>
                  ) : (
                    <Badge variant="outline">public</Badge>
                  )}
                  {post.pinned ? <Badge>pinned</Badge> : null}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {post.update_date || post.create_date || "—"}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/admin/${encodeURIComponent(post.slug)}/edit`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                    )}
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deleting === post.slug}
                    onClick={() => setPendingDelete(post)}
                  >
                    {deleting === post.slug ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !deleting) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete post &quot;{pendingDelete?.title}&quot;? This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(deleting)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={Boolean(deleting)}
              onClick={() => void confirmDelete()}
            >
              {deleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
