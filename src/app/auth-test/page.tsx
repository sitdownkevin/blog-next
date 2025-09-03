"use client";

import Profile from "@/components/features/auth/Profile";
import SignIn from "@/components/features/auth/SignIn";
import SignOut from "@/components/features/auth/SignOut";

export default function AuthTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">认证组件测试页面</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">登录/登出操作</h2>
          <div className="flex gap-4">
            <SignIn />
            <SignOut />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">用户资料</h2>
          <div className="border rounded-lg p-4">
            <Profile />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">测试说明：</h3>
        <ul className="space-y-1 text-sm">
          <li>• 点击"使用 GitHub 登录"按钮进行 OAuth 认证</li>
          <li>• 登录成功后，用户资料区域会显示用户信息和头像</li>
          <li>• 点击"登出"按钮可以退出登录</li>
          <li>• 所有操作都包含加载状态指示</li>
        </ul>
      </div>
    </div>
  );
}