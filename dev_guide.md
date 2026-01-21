# 开发指南（简版）

这份文档用于快速了解项目结构与职责分布，便于新增/修改功能前建立上下文。

## 架构概览

前端基于 Next.js 14 App Router，页面/组件与主题在 `app/`、`components/` 中组织；后端主要通过 `app/api` 提供聊天与沙箱能力，业务与集成逻辑集中在 `lib/`。

## 目录结构与职责

- `app/`：Next.js App Router 入口；页面、布局、Providers、Server Actions 都在此。
- `components/`：前端组件库（shadcn 风格）与业务组件。
- `lib/`：核心业务与集成层（模型路由、模板、schema、工具函数、第三方服务封装）。
- `public/thirdparty/`：第三方 logo/模板图标等静态资源。
- `sandbox-templates/`：E2B 沙箱模板源码（按模板目录组织，如 `nextjs-developer`、`vue-developer`、`streamlit-developer`、`gradio-developer`）。
- 其它配置：`middleware.ts`、`tailwind.config.ts`、`next.config.mjs`、`package.json`、`tsconfig.json` 等。

## 前端关键入口

- `app/layout.tsx`：全局布局与 HTML 框架。
- `app/providers.tsx`：全局 Providers（主题、埋点、状态等）。
- `app/page.tsx`：主界面与交互入口（聊天、预览、提交流程）。
- `app/globals.css`：主题/设计 token（CSS 变量控制浅色/深色主题）。
- `components/`：
  - `chat.tsx`：对话列表展示。
  - `chat-input.tsx`：对话输入与提交。
  - `chat-picker.tsx`：模型/模板选择入口。
  - `chat-settings.tsx`：模型参数与开关设置。
  - `preview.tsx`：右侧预览总容器与 tabs。
  - `fragment-preview.tsx`：运行结果预览总入口。
  - `fragment-web.tsx`：Web 预览展示。
  - `fragment-interpreter.tsx`：解释器结果展示。
  - `fragment-code.tsx`：代码文件展示入口。
  - `code-view.tsx`：代码视图渲染。
  - `code-theme.css`：代码高亮主题样式。
  - `navbar.tsx`：顶栏与操作入口。
  - `auth.tsx`：认证相关类型与工具。
  - `auth-dialog.tsx`：登录/注册弹窗。
  - `components/ui/`：shadcn/ui 基础组件。

## 后端与服务端入口

- `app/api/chat/route.ts`：LLM 生成 fragment 的主入口（流式结构化输出）。
- `app/api/morph-chat/route.ts`：Morph 模型的代码编辑/修补入口。
- `app/api/sandbox/route.ts`：E2B 沙箱创建与代码执行入口。
- `app/actions/`：
  - `publish.ts`：发布/分享相关 Server Action。
  - `validate-email.ts`：邮箱校验相关 Server Action。

## 核心业务与配置（lib）

- `lib/models.json`：模型注册表（UI 下拉展示与默认模型来源）。
- `lib/models.ts`：provider client 创建与路由（OpenAI 兼容、供应商配置）。
- `lib/templates.ts`：模板清单与提示词拼装（前端 persona 与后端模板选择依据）。
- `lib/schema.ts`：fragment 结构定义与校验。
- `lib/prompt.ts`：系统提示词拼装逻辑。
- `lib/messages.ts`：前端消息结构与多模态转换。
- `lib/ratelimit.ts`：请求限流封装。
- `lib/api-errors.ts`：API 错误统一处理与响应。
- `lib/auth.ts`：登录态与用户信息处理。
- `lib/supabase.ts`：Supabase 客户端配置与初始化。
- `lib/types.ts`：类型定义。
- `lib/utils.ts`：通用工具函数。
- `lib/duration.ts`：时间/窗口相关辅助。
- `lib/morph.ts`：Morph 编辑相关工具。

## 根目录关键文件

- `README.md`：项目简介与使用说明。
- `package.json`：依赖与脚本入口。
- `next.config.mjs`：Next.js 构建与运行配置。
- `tailwind.config.ts`：Tailwind 主题与扫描路径配置。
- `postcss.config.mjs`：PostCSS 插件配置。
- `tsconfig.json`：TypeScript 编译配置。
- `middleware.ts`：中间件（请求前置处理）。
- `components.json`：shadcn/ui 配置。
- `.env.template`：环境变量模板与说明。
- `LICENSE`：开源许可信息。

## 如何增加模型

- 在 `lib/models.json` 增加模型条目（`id`、`name`、`provider`、`providerId`）。
- `providerId` 必须与 `lib/models.ts` 的 `providerConfigs` key 一致。
- 新增 provider 时，优先沿用 `createOpenAI({ apiKey, baseURL })` 的兼容接入方式。
- 每个模型一般会涉及apikey，需要在 `.env.local` 和 `.env.template`增加相应的内容。
- 可选：在 `public/thirdparty/logos` 增加提供商 logo。

## 如何构建模板

- 模板源码位于 `sandbox-templates/` 下各目录（如 `nextjs-developer`、`streamlit-developer`）。
- 模板构建后才会出现在你的 E2B 团队列表，UI 才能使用。
- 开发环境建议构建 `*-dev` 模板，生产环境构建无 `-dev` 的同名模板。
- 构建方式以模板目录内的 `build.dev.ts` / `build.prod.ts` 为准。
- 构建前确保 `E2B_API_KEY` 已设置并登录 E2B CLI。
- 典型构建指令（逐模板执行）：
  - `export E2B_API_KEY="你的key"`
  - `cd sandbox-templates/<template-name>`
  - `npm ci`
  - `npx tsx build.dev.ts`
