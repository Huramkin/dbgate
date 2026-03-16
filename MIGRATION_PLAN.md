# DbGate 修改计划：pnpm 迁移 + Navicat 风格 UI

## 概述

本计划分为两大部分：
1. **依赖管理迁移**：从 Yarn Workspaces 迁移到 pnpm Workspaces
2. **UI 样式调整**：将现有界面风格调整为类似 Navicat 的专业数据库管理工具样式

---

## 第一部分：pnpm 迁移计划

### 1.1 当前状态分析

| 项目 | 当前状态 |
|------|---------|
| 包管理器 | Yarn v1 (Classic) |
| 工作空间 | `packages/*`, `plugins/*`, `integration-tests` (共 27+ 子包) |
| 锁文件 | `yarn.lock`（根目录）、`app/yarn.lock`、`e2e-tests/yarn.lock` |
| yarn 专用配置 | 4 个 `.yarnrc` 文件（版本标签配置） |
| CI/CD | 15+ GitHub Actions 工作流引用 `yarn` |
| 脚本 | 80+ 脚本使用 `yarn workspace` / `yarn` 命令 |

### 1.2 迁移步骤

#### 步骤 1：基础配置

- [ ] 创建 `pnpm-workspace.yaml`，定义工作空间：
  ```yaml
  packages:
    - 'packages/*'
    - 'plugins/*'
    - 'integration-tests'
  ```
- [ ] 创建 `.npmrc` 配置文件（pnpm 配置）：
  ```ini
  shamefully-hoist=true
  strict-peer-dependencies=false
  auto-install-peers=true
  ```
  > `shamefully-hoist=true` 用于兼容 yarn 的扁平化 node_modules 结构，避免迁移初期大量依赖解析问题
- [ ] 删除 `yarn.lock`
- [ ] 删除所有 `.yarnrc` 文件（`packages/api/.yarnrc`、`packages/types/.yarnrc`、`packages/tools/.yarnrc`、`packages/sqltree/.yarnrc`）

#### 步骤 2：修改 `package.json` — 根目录

- [ ] 移除 `"workspaces"` 字段（pnpm 使用 `pnpm-workspace.yaml`）
- [ ] 添加 `"packageManager": "pnpm@9.x.x"` 字段（Corepack 支持）
- [ ] 将所有脚本中的 `yarn workspace <name>` 替换为 `pnpm --filter <name>`
- [ ] 将所有 `yarn` 命令替换为 `pnpm`（除 `workspaces-run` 外）
- [ ] 替换 `workspaces-run --only="dbgate-plugin-*" -- yarn <script>` 为 `pnpm --filter "dbgate-plugin-*" <script>`
- [ ] 更新 `postinstall` 脚本

**示例转换：**

| 原始 (yarn) | 目标 (pnpm) |
|-------------|-------------|
| `yarn workspace dbgate-api start` | `pnpm --filter dbgate-api start` |
| `yarn workspace dbgate-web dev` | `pnpm --filter dbgate-web dev` |
| `workspaces-run --only="dbgate-plugin-*" -- yarn build:frontend` | `pnpm --filter "dbgate-plugin-*" build:frontend` |
| `yarn build:sqltree && yarn build:tools` | `pnpm build:sqltree && pnpm build:tools` |
| `cd app && yarn install && yarn build` | `cd app && pnpm install && pnpm build` |

#### 步骤 3：修改子包 `package.json`

- [ ] 检查所有子包是否有 `yarn` 相关脚本并替换
- [ ] 确保所有子包的依赖版本一致
- [ ] 检查 `postinstall` 脚本兼容性

#### 步骤 4：修改 CI/CD 工作流

需要修改的工作流文件（共 15 个）：

| 文件 | 修改内容 |
|------|---------|
| `.github/workflows/run-tests.yaml` | `yarn install` → `pnpm install`，`yarn test:ci` → `pnpm test:ci` |
| `.github/workflows/build-docker.yaml` | `yarn install` → `pnpm install`，所有 `yarn` → `pnpm` |
| `.github/workflows/build-app.yaml` | 类似替换，增加 `pnpm setup` 步骤 |
| `.github/workflows/build-app-beta.yaml` | 同上 |
| `.github/workflows/build-app-check.yaml` | 同上 |
| `.github/workflows/build-app-pro.yaml` | 同上 |
| `.github/workflows/build-app-pro-beta.yaml` | 同上 |
| `.github/workflows/build-npm.yaml` | 同上 |
| `.github/workflows/build-npm-pro.yaml` | 同上 |
| `.github/workflows/build-docker-pro.yaml` | 同上 |
| `.github/workflows/build-cloud-pro.yaml` | 同上 |
| `.github/workflows/e2e-pro.yaml` | 同上 |
| `.github/workflows/process-templates.yaml` | `yarn add -W` → `pnpm add -w` |
| `.github/workflows/diflow.yaml` | 检查并修改 |
| `.github/workflows/build-test-containers.yaml` | 检查并修改 |

每个工作流需要添加 pnpm 安装步骤：
```yaml
- name: Install pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 9
- name: Use Node.js 22.x
  uses: actions/setup-node@v4
  with:
    node-version: 22.x
    cache: 'pnpm'
```

#### 步骤 5：修改 Docker 相关

- [ ] 更新 `docker/Dockerfile` — 添加 pnpm 安装（Docker 中 Node 镜像不自带 pnpm）
- [ ] 更新 `docker/Dockerfile-alpine` — 同上
- [ ] 更新 `docker/.gitignore` — `yarn.lock` → `pnpm-lock.yaml`
- [ ] 修改 `install:drivers:docker` 和 `install:drivers:packer` 脚本

#### 步骤 6：更新文档

- [ ] 更新 `README.md` — 所有 `yarn` 指令替换为 `pnpm`
- [ ] 更新 `CLAUDE.md` — 开发命令部分
- [ ] 更新 `AGENTS.md`（如有需要）

#### 步骤 7：移除 yarn 依赖

- [ ] 移除 `devDependencies` 中的 `workspaces-run`（pnpm 原生支持 filter）
- [ ] 清理所有 `node_modules`
- [ ] 运行 `pnpm install` 生成 `pnpm-lock.yaml`
- [ ] 验证所有 `pnpm build:lib` 可以成功

### 1.3 迁移风险与注意事项

| 风险点 | 缓解措施 |
|-------|---------|
| Phantom dependencies（幽灵依赖） | 使用 `shamefully-hoist=true` 过渡，后续逐步改为严格模式 |
| `workspaces-run` 不兼容 pnpm | 使用 pnpm 原生 `--filter` 替代 |
| Electron 构建兼容性 | `app/` 目录保持独立 `pnpm install` |
| patch-package 兼容性 | pnpm 支持 patch-package，无需额外处理 |
| CI 缓存失效 | 使用 `actions/setup-node` 的 `cache: 'pnpm'` |

---

## 第二部分：Navicat 风格 UI 调整计划

### 2.1 Navicat UI 特征分析

Navicat 是一款专业的数据库管理工具，其 UI 特征如下：

| 特征 | 描述 |
|------|------|
| **整体配色** | 浅灰白色基调，蓝色强调色，专业商务风格 |
| **侧边栏** | 白色/浅灰背景，树形导航，图标颜色丰富 |
| **工具栏** | 浅灰渐变背景，大图标 + 文字标签，带分组分隔线 |
| **标签页** | 扁平化标签，当前标签白底 + 蓝色底部边框 |
| **数据表格** | 白色单元格，浅灰交替行，蓝色选中，清晰的网格线 |
| **表头** | 浅灰渐变背景，微妙立体感 |
| **状态栏** | 浅灰底色（非彩色），深色文字 |
| **字体** | 系统原生字体，中等大小，清晰可读 |
| **边框** | 细线边框（1px），浅灰色 |
| **圆角** | 极少使用圆角，偏向方正风格 |
| **图标** | 彩色图标，风格统一，清晰度高 |

### 2.2 当前 DbGate vs Navicat 对比

| 区域 | DbGate 当前 | Navicat 目标 |
|------|------------|-------------|
| 侧边栏底色 | `zinc-200`（中灰） | 白色/`zinc-50`（几乎白色） |
| 侧边栏图标面板 | `zinc-800`（深色竖条） | 浅灰渐变，与主体融合 |
| 工具栏 | 白色，扁平 | 浅灰渐变，略有立体感 |
| 标签栏 | `zinc-100` 底，sky-500 下边框 | 白色底，蓝色下边框，方正外观 |
| 数据表格 | `zinc-100` 交替行 | `blue-50` / 白色 交替行 |
| 表头 | `zinc-100` 平面 | 浅灰渐变，微立体 |
| 状态栏 | `sky-700`（蓝色） | 浅灰色（`zinc-200`），深色文字 |
| 模态框 | 白底，`zinc-300` 头 | 白底，蓝色标题栏头部 |
| 按钮 | `sky-700` 蓝色填充 | 蓝色渐变按钮，更精致 |
| 输入框 | 微弱阴影 | 清晰边框，无阴影 |

### 2.3 主题修改详细清单

#### 2.3.1 浅色主题 (`themeLightColors.ts`) — 核心修改项

```
区域: 侧边栏
  --theme-sidebar-background:       zinc-200 → zinc-50 (接近白色)
  --theme-sidebar-background-hover:  zinc-300 → zinc-100
  --theme-sidebar-background-active: zinc-300 → zinc-200
  --theme-sidebar-background-focused: sky-200 → sky-100
  --theme-sidebar-section-background: zinc-400 → zinc-100 (更浅的分区)

区域: 左侧图标面板 (Widget Panel)
  --theme-widget-panel-background:   zinc-800 → zinc-100 (从深色改为浅色)
  --theme-widget-panel-foreground:   zinc-500 → zinc-600
  --theme-widget-icon-background-active: zinc-600 → sky-100
  --theme-widget-icon-foreground-active: white → sky-700

区域: 标签栏
  --theme-tabs-panel-background:     zinc-100 → zinc-50
  --theme-tabs-panel-active-background: zinc-50 → white
  --theme-tabs-panel-item-background: zinc-200 → zinc-100

区域: 工具栏
  --theme-toolstrip-background:      white → linear-gradient(zinc-50, zinc-100)
  --theme-toolstrip-button-background: white → zinc-50

区域: 数据表格
  --theme-datagrid-headercell-background: zinc-100 → linear-gradient(zinc-50, zinc-150)
  --theme-datagrid-cell-background-alt:  zinc-100 → blue-50/zinc-50 (淡蓝交替)
  --theme-datagrid-border-horizontal:    zinc-200 → zinc-300 (更清晰的网格线)
  --theme-datagrid-border-vertical:      zinc-100 → zinc-200

区域: 状态栏
  --theme-statusbar-background:      sky-700 → zinc-200 (改为浅灰)
  --theme-statusbar-foreground:      zinc-100 → zinc-700 (深色文字)
  --theme-statusbar-background-hover: 透明白 → zinc-300

区域: 模态框
  --theme-modal-header-background:   zinc-300 → sky-600 (蓝色标题)

区域: 按钮
  --theme-formbutton-background:     sky-700 → 渐变蓝色

区域: 输入框
  --theme-input-shadow:              移除阴影
  --theme-input-border:              zinc-300 → zinc-400 (更清晰边框)

区域: 搜索框
  --theme-searchbox-background:      zinc-300 → white (白色搜索框)
  --theme-searchbox-border:          zinc-400 → zinc-300
```

#### 2.3.2 深色主题 (`themeDarkColors.ts`) — 对应调整

深色主题做对应的风格统一调整，保持 Navicat 的专业质感：
- 侧边栏使用更深的统一背景色
- 数据表格保持清晰的网格线
- 状态栏改为深色底色 + 浅色文字（区别于蓝色）

#### 2.3.3 布局尺寸调整 (`dimensions.css`)

```css
--dim-widget-icon-size:    50px → 48px (略微紧凑)
--dim-statusbar-height:    22px → 24px (稍高状态栏)
--dim-tabs-height:         33px → 32px
--dim-toolbar-height:      30px → 34px (稍高工具栏)
--dim-toolstrip-height:    28px → 32px
```

#### 2.3.4 全局样式调整 (`global.css`)

- 字体：使用系统 UI 字体栈，确保跨平台一致性
- 减少圆角使用，偏向方正风格
- 分隔线使用更一致的灰色

### 2.4 组件级别的样式调整

| 组件/文件 | 调整内容 |
|----------|---------|
| `packages/web/src/widgets/` | 侧边栏组件：调整图标大小、间距、hover 效果 |
| `packages/web/src/datagrid/` | 数据表格：表头渐变、交替行色、选中效果 |
| `packages/web/src/elements/TabControl.svelte` | 标签控件：方正标签、蓝色底部指示 |
| `packages/web/src/buttons/ToolStripButton.svelte` | 工具栏按钮：渐变背景、图标 + 文字 |
| `packages/web/src/modals/` | 模态框：蓝色标题栏、更精致的按钮 |
| `packages/web/src/forms/` | 表单控件：清晰边框、统一间距 |

### 2.5 新增 Navicat 主题

建议创建一个独立的 Navicat 风格主题文件，而不是直接修改默认主题：

- [ ] 创建 `packages/web/src/plugins/themeNavicatLightColors.ts`
- [ ] 创建 `packages/web/src/plugins/themeNavicatDarkColors.ts`
- [ ] 在 `themes.ts` 中注册新主题
- [ ] 将 Navicat 主题设为默认主题

这样做的好处：
- 不破坏现有用户的主题偏好
- 可以随时切换回原始主题
- 更容易进行 A/B 测试和用户反馈

---

## 第三部分：实施优先级与时间线

### Phase 1：pnpm 迁移（优先）

| 步骤 | 工作量预估 |
|------|-----------|
| 1. 基础配置 + workspace 文件 | 小 |
| 2. 根 package.json 脚本迁移 | 中 |
| 3. 子包 package.json 检查 | 小 |
| 4. CI/CD 工作流迁移 | 大 |
| 5. Docker 文件更新 | 小 |
| 6. 文档更新 | 小 |
| 7. 测试验证 | 中 |

### Phase 2：Navicat 风格 UI

| 步骤 | 工作量预估 |
|------|-----------|
| 1. 创建 Navicat 主题颜色文件 | 中 |
| 2. 注册新主题 | 小 |
| 3. 调整布局尺寸 | 小 |
| 4. 组件级微调 | 大 |
| 5. 深色主题适配 | 中 |
| 6. 视觉测试与迭代 | 中 |

---

## 第四部分：回滚策略

### pnpm 迁移回滚
- 保留 `yarn.lock` 在 git 历史中
- 如果 pnpm 出现问题，可以通过 git revert 恢复 yarn 配置

### UI 主题回滚
- 由于使用独立主题文件，用户可在设置中切换回原始主题
- 不修改默认主题文件，只新增 Navicat 主题

---

## 文件变更清单总览

### 新增文件
- `pnpm-workspace.yaml`
- `.npmrc`
- `packages/web/src/plugins/themeNavicatLightColors.ts`
- `packages/web/src/plugins/themeNavicatDarkColors.ts`

### 修改文件
- `package.json`（根目录）— 脚本迁移
- 所有子包的 `package.json`（如有 yarn 特定脚本）
- `.github/workflows/*.yaml`（15 个工作流文件）
- `docker/Dockerfile`
- `docker/Dockerfile-alpine`
- `docker/.gitignore`
- `packages/web/src/plugins/themes.ts`
- `packages/web/public/dimensions.css`
- `packages/web/public/global.css`
- `CLAUDE.md`
- `README.md`

### 删除文件
- `yarn.lock`
- `packages/api/.yarnrc`
- `packages/types/.yarnrc`
- `packages/tools/.yarnrc`
- `packages/sqltree/.yarnrc`
- `app/yarn.lock`
- `e2e-tests/yarn.lock`
