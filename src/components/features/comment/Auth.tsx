"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubIcon, LogOutIcon, Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionData {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

export function AuthSection() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await authClient.getSession();
        if (!error && data) {
          setSessionData(data);
        } else {
          setSessionData(null);
        }
      } catch (err) {
        console.error("获取会话失败:", err);
        setSessionData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      const currentURL = typeof window !== 'undefined' ? window.location.href : '/';
      
      await authClient.signIn.social({
        provider: "github",
        callbackURL: currentURL,
      });
    } catch (error) {
      console.error("登录失败:", error);
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      setSessionData(null);
      window.location.reload();
    } catch (error) {
      console.error("登出失败:", error);
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!sessionData) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-lg">登录后参与评论</CardTitle>
          <CardDescription>
            使用GitHub账号登录，与其他用户互动交流
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="gap-2"
            size="lg"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                登录中...
              </>
            ) : (
              <>
                <GithubIcon className="h-4 w-4" />
                使用 GitHub 登录
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={sessionData.user.image} alt={sessionData.user.name} />
              <AvatarFallback>
                {sessionData.user.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col">
              <p className="font-medium text-sm">{sessionData.user.name}</p>
              <p className="text-xs text-muted-foreground">
                已登录 {sessionData.user.emailVerified && "• 邮箱已验证"}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="gap-2"
          >
            {isSigningOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOutIcon className="h-4 w-4" />
                登出
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}