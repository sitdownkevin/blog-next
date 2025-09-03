"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      // 获取当前页面 URL 作为回调地址
      // const currentURL = typeof window !== 'undefined' ? window.location.href : '/';
      
      await authClient.signIn.social({
        provider: "github",
        // callbackURL: currentURL,
      });
    } catch (error) {
      console.error("登录失败:", error);
      setIsLoading(false);
    }
    // 注意：成功登录会跳转到 GitHub，所以不需要在这里 setIsLoading(false)
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSignIn}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          登录中...
        </>
      ) : (
        <>
          使用 GitHub 登录
          <GithubIcon className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}
