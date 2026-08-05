"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Posts route error:", error);
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-20 px-4">
      <h2 className="text-lg font-medium">Failed to load posts</h2>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Something went wrong while loading this page. You can try again.
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
