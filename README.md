# socratic-mentor

<p align="center">
  <strong>一个苏格拉底式的 AI 学习导师，让你自己发现答案。</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude%20Code-%E2%9C%94-brightgreen" alt="Claude Code">
  <img src="https://img.shields.io/badge/safe%20global%20install-%E2%9C%94-blue" alt="Safe Global Install">
  <img src="https://img.shields.io/badge/modes-Q%26A%20%7C%20Code%20Learning-orange" alt="Modes">
  <img src="https://img.shields.io/npm/v/socratic-mentor" alt="npm">
</p>

---

## Why

大多数 AI 直接给你答案。这个技能**教你思考**。

- 用苏格拉底式提问引导你自己发现答案
- 每次讲解控制在 ~200 字，宁整不碎
- 理解验证：让你用自己的话讲回来，确保你真的懂了
- 在代码仓库中：引实际文件和行号，带你追踪调用链

> 最好的老师不是告诉你答案的人，而是让你自己找到答案的人。

## Installation

```bash
# 全局安装 — 所有项目可用
npm install -g socratic-mentor

# 单项目安装 — 仅当前项目
npx socratic-mentor

# 或作为项目依赖固化版本
npm install --save-dev socratic-mentor
```

### 全局 vs 项目级

| 方式 | 命令 | 适用场景 |
|------|------|---------|
| 全局 | `npm install -g` | 所有项目都想用，一次安装到处可用 |
| npx | `npx socratic-mentor` | 只在这个项目用，不污染全局 |
| devDependency | `npm install --save-dev` | 团队共享，锁定版本 |

### 验证安装

```bash
# 检查技能文件是否存在
ls ~/.claude/skills/socratic-mentor/SKILL.md   # 全局
ls .claude/skills/socratic-mentor/SKILL.md     # 项目级
```

### 激活

安装后在 Claude Code 中说：**"学习模式"**

技能会自动检测你的项目环境，有代码库就问你要不要学代码，空目录则进入问答模式。首次使用后会问你要不要设为默认激活。

## Quick Start

用"学习模式"激活后，试试这些：

```
"讲讲 React hooks 是怎么工作的？"
"这个项目的 auth 中间件在做什么？"
"为什么说 Rust 的所有权系统能防止内存泄漏？"
```

每个问题技能都会用苏格拉底式提问引导你——不直接给答案，让你自己发现。

## Features

### 两种学习模式

| 模式 | 适合 | 特点 |
|------|------|------|
| **Q&A 模式** | 空项目、概念学习 | 类比、场景、对话驱动 |
| **代码学习模式** | 有代码仓库 | 引用实际文件/行号、读代码练习、架构探索 |

### 五步学习循环

```
探索基线 → 分块讲解 → 理解验证 → 自适应跟进 → 收尾回顾
```

- 三个退出信号自动检测学习结束，主动提议收尾
- 收尾时自动生成关键要点，可同步到飞书

### 智能激活

两级激活系统，全局安装也安全：

| 层级 | 机制 |
|------|------|
| 环境激活 | 检查项目偏好 → 检测代码库 → 引导选择模式 |
| 意图检测 | 区分学习意图 vs. 工程指令，默认假设你想学 |

### 自动退出

不打扰正常工作。三层退出防护：

| 层级 | 触发条件 |
|------|---------|
| 明确退出 | "直接做""别问了""工程模式" |
| 工程指令 | git 操作、配置管理 |
| 话题闭环 | 学习目标完成，用户选择停止 |

退出后可随时说"学习模式"重新进入。

## Configuration

偏好自动写入 `.claude/settings.local.json`：

```json
{
  "socratic-mentor": {
    "activated": true,
    "feishuDocToken": "<your-doc-token>"
  }
}
```

| 配置项 | 说明 |
|--------|------|
| `activated` | 设为 `true` 后，进入项目即进入待命 |
| `feishuDocToken` | 飞书文档 token，绑定后可一键同步学习笔记 |

## Feishu Sync

学习要点可同步到飞书文档。首次无配置时自动引导绑定。

## License

MIT
