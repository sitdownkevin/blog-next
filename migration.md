```
blog-next/
├── 📁 content/                          # 内容数据统一管理
│   ├── posts/                          # 博客文章（从根目录迁移）
│   │   ├── beauty-of-svd.md
│   │   ├── blackboard-enhanced.md
│   │   └── ...
│   ├── quickrefs/                      # 快速参考文档（从根目录迁移）
│   │   ├── brew.md
│   │   ├── clash.md
│   │   └── ...
│   └── data/                           # 静态数据文件
│       ├── cv.json
│       └── search/                     # 搜索相关数据
│           ├── ais.json
│           ├── ft.json
│           └── ...
│
├── 📁 public/                          # 静态资源（重新组织）
│   ├── favicon.ico
│   ├── assets/                         # 媒体资源
│   │   ├── images/                     # 图片资源
│   │   │   ├── photos/                 # 个人照片
│   │   │   ├── figures/                # 文章插图
│   │   │   └── meme/                   # 表情包等
│   │   ├── documents/                  # 文档资源
│   │   │   ├── pdf/
│   │   │   └── jupyter/
│   │   └── icons/                      # 图标文件
│   │       ├── favicon-16x16.png
│   │       └── favicon-32x32.png
│
├── 📁 src/
│   ├── 📁 app/                         # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── (pages)/                    # 页面分组
│   │   │   ├── posts/
│   │   │   ├── me/
│   │   │   ├── resume/
│   │   │   └── tools/
│   │   └── api/                        # API 路由
│   │       ├── posts/
│   │       ├── db/
│   │       ├── pow/
│   │       └── rss/
│   │
│   ├── 📁 components/                  # 组件统一管理
│   │   ├── ui/                         # 基础UI组件
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/                     # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── features/                   # 功能组件
│   │       ├── blog/                   # 博客相关组件
│   │       │   ├── PostCard.tsx
│   │       │   ├── CodeBlock.tsx
│   │       │   └── MarkdownRenderer.tsx
│   │       ├── resume/                 # 简历组件
│   │       │   ├── Education.tsx
│   │       │   └── Experience.tsx
│   │       └── tools/                  # 工具组件
│   │           ├── advanced-search/
│   │           └── gpt-image-prompts/
│   │
│   ├── 📁 lib/                         # 核心逻辑库
│   │   ├── config/                     # 配置文件
│   │   │   ├── site.ts                 # 网站配置
│   │   │   └── database.ts             # 数据库配置
│   │   ├── types/                      # 类型定义集中管理
│   │   │   ├── index.ts                # 导出所有类型
│   │   │   ├── post.ts                 # 文章相关类型
│   │   │   ├── user.ts                 # 用户相关类型
│   │   │   └── common.ts               # 通用类型
│   │   ├── services/                   # 业务逻辑服务
│   │   │   ├── post.service.ts         # 文章服务
│   │   │   ├── comment.service.ts      # 评论服务
│   │   │   └── search.service.ts       # 搜索服务
│   │   ├── utils/                      # 工具函数
│   │   │   ├── index.ts                # 通用工具函数
│   │   │   ├── markdown.ts             # Markdown处理
│   │   │   ├── crypto.ts               # 加密相关
│   │   │   └── date.ts                 # 日期处理
│   │   └── hooks/                      # 自定义React Hooks
│   │       ├── useLocalStorage.ts
│   │       └── useDebounce.ts
│   │
│   └── 📁 styles/                      # 样式文件
│       ├── globals.css
│       ├── components.css              # 组件样式
│       └── pages.css                   # 页面样式
│
├── 📝 配置文件
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
└── README.md

```