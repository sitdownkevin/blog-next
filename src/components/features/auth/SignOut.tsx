"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
export default function SignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      // 登出后刷新当前页面以更新状态
      window.location.reload();
    } catch (error) {
      console.error("登出失败:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={handleSignOut}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          登出中...
        </>
      ) : (
        <>
          登出
          <LogOutIcon className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}
