"use client";

import { authClient } from "@/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email?: string;
  image?: string | null;
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
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}

export default function Profile() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await authClient.getSession();
        if (error) {
          setError(error.message || "获取会话失败");
          setSessionData(null);
        } else {
          setSessionData(data);
          setError(null);
        }
      } catch (err) {
        setError("获取会话时发生错误");
        setSessionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>加载会话时出错: {error}</p>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="p-4">
        <p className="text-gray-500">未登录</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={sessionData.user?.image || ""}
            alt={sessionData.user?.name || "用户头像"}
          />
          <AvatarFallback>
            {sessionData.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">用户资料</h1>
          <div className="space-y-1">
            <p className="text-lg font-medium">
              {sessionData.user?.name || "未设置姓名"}
            </p>
            <p className="text-gray-600">
              {sessionData.user?.email || "未设置邮箱"}
            </p>
            <p className="text-sm text-green-600">
              状态: 已登录
              {sessionData.user?.emailVerified && " • 邮箱已验证"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">会话信息</h3>
        <div className="text-sm space-y-1">
          <p>用户ID: {sessionData.user?.id}</p>
          {sessionData.session?.token && (
            <p>会话ID: {sessionData.session.token.slice(0, 20)}...</p>
          )}
          <p>
            创建时间:{" "}
            {sessionData.user?.createdAt
              ? sessionData.user.createdAt.toLocaleString("zh-CN")
              : "未知"}
          </p>
        </div>
      </div>
    </div>
  );
}
