export type ProjectLocale = "en" | "zh";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectAction = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

export type ProjectSection = {
  title: string;
  actions: ProjectAction[];
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  summary: string;
  features: ProjectFeature[];
  sections: ProjectSection[];
  links: ProjectLink[];
};

const projectsByLocale: Record<ProjectLocale, Project[]> = {
  en: [
    {
      slug: "dorm-wifi",
      title: "DORM WIFI",
      tagline: "A simple, fast WiFi connector for Tongji dorms.",
      summary:
        "WiFi utility for Tongji dorms with automatic authentication and seamless reconnect.",
      description:
        "DORM WIFI helps you connect to TJ-DORM-WIFI without repeatedly entering credentials. Built with Tauri for desktop and React Native for Android, with local credential storage and live connection status.",
      features: [
        {
          title: "One-tap connect",
          description:
            "Connect or disconnect from TJ-DORM-WIFI without retyping your account and password.",
        },
        {
          title: "Secure local storage",
          description:
            "Network credentials stay on your device for quick reconnects.",
        },
        {
          title: "Connection status",
          description:
            "Monitor network status in real time while you stay online.",
        },
        {
          title: "Device lookup",
          description:
            "Query devices bound to the current account from the desktop app.",
        },
      ],
      sections: [
        {
          title: "macOS",
          actions: [
            {
              label: "Intel",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_x64.dmg",
              external: true,
              primary: true,
            },
            {
              label: "Apple Silicon",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_aarch64.dmg",
              external: true,
              primary: true,
            },
          ],
        },
        {
          title: "Windows",
          actions: [
            {
              label: "Download latest",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_x64-setup.exe",
              external: true,
              primary: true,
            },
          ],
        },
        {
          title: "Android",
          actions: [
            {
              label: "Download APK",
              href: "https://github.com/sitdownkevin/dorm-wifi-react-native/releases/download/v1.0.0/build-1740468692243.apk",
              external: true,
              primary: true,
            },
          ],
        },
      ],
      links: [
        {
          label: "Desktop source (Tauri)",
          href: "https://github.com/sitdownkevin/dorm-wifi-tauri",
          external: true,
        },
        {
          label: "Mobile source (React Native)",
          href: "https://github.com/sitdownkevin/dorm-wifi-react-native",
          external: true,
        },
        {
          label: "Original landing page",
          href: "https://sitdownkevin.github.io/dorm-wifi-tauri/",
          external: true,
        },
      ],
    },
    {
      slug: "blackboard-enhanced",
      title: "Blackboard Enhanced",
      tagline: "A userscript that makes university Blackboard easier to use.",
      summary:
        "Userscript that improves Blackboard for university coursework, rebuilt with React.",
      description:
        "Blackboard Enhanced is a Tampermonkey / Violentmonkey userscript for SCUPI Blackboard (pibb.scu.edu.cn). It adds a deadline poster on the home page, faster assignment grading helpers, and a local memo for marking workflows.",
      features: [
        {
          title: "Deadline poster",
          description:
            "Show floating schedule posters and countdowns on the Blackboard home page, with quick jumps into courses.",
        },
        {
          title: "Score deduction helper",
          description:
            "Type deductions after a minus sign in feedback; the script fills the attempt score automatically.",
        },
        {
          title: "Memo & layout",
          description:
            "Auto-expand the grading view and keep a local memo for answers across refreshes.",
        },
      ],
      sections: [
        {
          title: "Install",
          actions: [
            {
              label: "Install on GreasyFork",
              href: "https://greasyfork.org/zh-CN/scripts/462240-bb%E8%AE%A1%E7%AE%97%E5%88%86%E6%95%B0",
              external: true,
              primary: true,
            },
            {
              label: "Violentmonkey (Chrome)",
              href: "https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag?hl=zh-CN",
              external: true,
            },
            {
              label: "Tampermonkey (Chrome)",
              href: "https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN",
              external: true,
            },
          ],
        },
      ],
      links: [
        {
          label: "Source on GitHub",
          href: "https://github.com/sitdownkevin/Blackboard-Enhanced",
          external: true,
        },
        {
          label: "Related post",
          href: "/posts/blackboard-enhanced",
          external: false,
        },
      ],
    },
  ],
  zh: [
    {
      slug: "dorm-wifi",
      title: "DORM WIFI",
      tagline: "简单、快速的同济大学寝室 WiFi 连接工具。",
      summary: "同济宿舍 WiFi 工具，支持自动认证与无缝重连。",
      description:
        "DORM WIFI 让你无需反复输入账号密码即可连接 TJ-DORM-WIFI。桌面端基于 Tauri，Android 端基于 React Native，支持本地安全存储凭据与实时网络状态监控。",
      features: [
        {
          title: "快速连接",
          description: "一键连接或断开宿舍 WiFi，无需重复输入账号密码。",
        },
        {
          title: "安全存储",
          description: "网络凭据保存在本地，方便快速重连。",
        },
        {
          title: "网络状态",
          description: "实时监控网络连接状态。",
        },
        {
          title: "设备查询",
          description: "在桌面端查询当前账号下已绑定的设备信息。",
        },
      ],
      sections: [
        {
          title: "macOS",
          actions: [
            {
              label: "Intel 版本",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_x64.dmg",
              external: true,
              primary: true,
            },
            {
              label: "Apple Silicon 版本",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_aarch64.dmg",
              external: true,
              primary: true,
            },
          ],
        },
        {
          title: "Windows",
          actions: [
            {
              label: "下载最新版",
              href: "https://github.com/sitdownkevin/dorm-wifi-tauri/releases/download/v1.0.1/DORM.WIFI_1.0.1_x64-setup.exe",
              external: true,
              primary: true,
            },
          ],
        },
        {
          title: "Android",
          actions: [
            {
              label: "下载 APK",
              href: "https://github.com/sitdownkevin/dorm-wifi-react-native/releases/download/v1.0.0/build-1740468692243.apk",
              external: true,
              primary: true,
            },
          ],
        },
      ],
      links: [
        {
          label: "桌面端源码 (Tauri)",
          href: "https://github.com/sitdownkevin/dorm-wifi-tauri",
          external: true,
        },
        {
          label: "移动端源码 (React Native)",
          href: "https://github.com/sitdownkevin/dorm-wifi-react-native",
          external: true,
        },
        {
          label: "原落地页",
          href: "https://sitdownkevin.github.io/dorm-wifi-tauri/",
          external: true,
        },
      ],
    },
    {
      slug: "blackboard-enhanced",
      title: "Blackboard Enhanced",
      tagline: "让高校 Blackboard 更好用的油猴脚本。",
      summary: "面向高校 Blackboard 的油猴脚本，基于 React 增强常用功能。",
      description:
        "Blackboard Enhanced 是面向四川大学匹兹堡学院 Blackboard（pibb.scu.edu.cn）的 Tampermonkey / Violentmonkey 油猴脚本。它在首页提供 DDL 海报与倒计时，并在作业批改流程中提供扣分辅助与本地备忘录。",
      features: [
        {
          title: "DDL 海报",
          description:
            "在 Bb 首页显示日程悬浮海报与倒计时，点击课程名称可直接跳转。",
        },
        {
          title: "扣分统计",
          description:
            "在反馈窗口用「-」后跟分值记录扣分，脚本自动填入尝试成绩。",
        },
        {
          title: "备忘录与布局",
          description:
            "批改界面自动展开，并提供本地备忘录，刷新后内容仍保留。",
        },
      ],
      sections: [
        {
          title: "安装",
          actions: [
            {
              label: "在 GreasyFork 安装",
              href: "https://greasyfork.org/zh-CN/scripts/462240-bb%E8%AE%A1%E7%AE%97%E5%88%86%E6%95%B0",
              external: true,
              primary: true,
            },
            {
              label: "暴力猴 (Chrome)",
              href: "https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag?hl=zh-CN",
              external: true,
            },
            {
              label: "油猴 (Chrome)",
              href: "https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN",
              external: true,
            },
          ],
        },
      ],
      links: [
        {
          label: "GitHub 源码",
          href: "https://github.com/sitdownkevin/Blackboard-Enhanced",
          external: true,
        },
        {
          label: "相关文章",
          href: "/posts/blackboard-enhanced",
          external: false,
        },
      ],
    },
  ],
};

export function getProjects(locale: ProjectLocale = "en"): Project[] {
  return projectsByLocale[locale] || projectsByLocale.en;
}

export function getProjectBySlug(
  slug: string,
  locale: ProjectLocale = "en",
): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projectsByLocale.en.map((project) => project.slug);
}
