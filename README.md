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
npx skills add 2p1c/socratic-mentor
```

也可以通过 npm 安装：

```bash
npm install -g socratic-mentor      # 全局安装
npx socratic-mentor                 # 单项目安装
npm install --save-dev socratic-mentor  # 作为项目依赖
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

**两种模式** — Q&A 模式应对概念学习，代码模式追踪实际文件和调用链

**苏格拉底式引导** — 不直接给答案，用提问让你自己发现，每次讲解 ~200 字

**智能激活** — 全局安装默认静默，检测到学习意图或有代码库时才激活

**自动退出** — 识别工程指令自动退出，不干扰正常工作

**飞书同步** — 学习要点可同步到飞书文档，首次无配置时自动引导绑定

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

## License

MIT
