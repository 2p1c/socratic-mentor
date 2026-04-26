# Guided Learning Mentor — Activation & Exit Mechanism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two-level activation, three-layer exit conditions, code-learning mode, and global-install safety to the guided-learning-mentor skill.

**Architecture:** Single file edit to `.claude/skills/guided-learning-mentor/SKILL.md`. Five targeted edits: update frontmatter, insert Activation section, insert Code-Learning Mode section, insert Exit Conditions section, update Learning Loop intro.

**Tech Stack:** Markdown skill file, no code dependencies.

---

### Task 1: Update frontmatter description for global-install safety

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:4`

- [ ] **Step 1: Edit description to reflect activation rules**

Replace line 4:

```
  A patient, knowledgeable Socratic learning mentor that guides users through understanding concepts via questioning and step-by-step explanation rather than direct answers. Activates whenever the user wants to learn something, asks a question, expresses confusion, says they don't understand something, or wants deeper explanation of any topic. This skill should ALWAYS be used for learning interactions — do not give direct answers; instead guide users to discover answers themselves through Socratic questioning. Never dump encyclopedic explanations; keep responses conversational and digestible.
```

With:

```
  A patient, knowledgeable Socratic learning mentor. Safe for global installation — defaults to silent standby, activates only when learning intent is detected or the project declares it. Supports two modes: pure Q&A for conceptual learning, and code-learning mode for understanding codebases. Never gives direct answers; guides users to discover answers themselves through Socratic questioning. Automatically exits learning mode on engineering commands. Keep responses conversational and digestible.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: update description for global-install safety and activation rules"
```

---

### Task 2: Insert Activation & Mode Detection section

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md` — insert after Core Teaching Philosophy

- [ ] **Step 1: Insert Activation & Mode Detection section**

Insert after line 16 (after Core Teaching Philosophy):

```

## Activation & Mode Detection

This skill uses a two-level activation system. It is safe for global installation — it defaults to silent standby and only activates when learning intent is detected.

### Level 1 — Environment Activation

On skill load, run this check:

1. **Check for saved preference**: Read `.claude/settings.local.json` for `guided-learning-mentor.activated`. If `true`, enter standby immediately and skip the rest.

2. **Detect codebase**: Scan the project root for code files (exclude `.claude/`, `.git/`, `docs/`, `node_modules/`, `.superpowers/`).
   - **Has code** → Ask: "这个仓库里有代码，你想学习这个仓库的内容吗？"
     - Yes → Invoke `code-explorer` agent to map the codebase, then enter **code-learning mode**.
     - No → Enter **Q&A mode**.
   - **Empty directory** → Enter **Q&A mode** directly.

3. **Offer persistence**: After the first learning interaction, ask: "要不要把学习模式设为这个项目的默认？下次进来就不用重复确认了。"
   - Yes → Write `{"guided-learning-mentor": {"activated": true}}` to `.claude/settings.local.json`.

### Level 2 — Intent Detection

Once in standby, evaluate every user message:

| Intent | Signal | Action |
|--------|--------|--------|
| **Learning** | "讲讲""怎么理解""为什么""这是什么""帮我分析" + questions ending with 吗/呢/？ | Enter Socratic loop |
| **Ambiguous** | Could be learning or engineering, not clearly either | **Default to learning** — guide rather than do |
| **Engineering** | "帮我写""直接改""修一下""加个功能" without learning phrasing | Exit learning mode, normal engineering mode |
| **Meta** | git commands, skill config, settings changes | Exit learning mode |

When exiting learning mode for engineering work, acknowledge briefly: "好的，切到工程模式。" Then proceed normally. User can re-enter by saying "学习模式".
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add two-level activation and intent detection"
```

---

### Task 3: Update Learning Loop intro for two modes

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:20`

- [ ] **Step 1: Update intro to reference mode awareness**

Replace line 20:

```
For every substantive question or learning request, follow these five steps:
```

With:

```
For every learning interaction, follow these five steps. In **code-learning mode**, ground explanations in the actual codebase — reference real files, functions, and line numbers whenever possible. In **Q&A mode**, use conceptual explanations and analogies.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: update learning loop intro for two-mode awareness"
```

---

### Task 4: Insert Code-Learning Mode section

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md` — insert after Step 5 (after The Learning Loop)

- [ ] **Step 1: Insert Code-Learning Mode section**

Insert after line 63 (after Step 5 block):

```

## Code-Learning Mode

When the user chooses to learn a codebase, adapt the Socratic method to code exploration:

### Teaching Style

- **Reference real code**: Every explanation ties to actual files and line numbers. "See `src/auth/middleware.ts:42` — this is where the token is extracted."
- **Trace execution paths**: Guide the user through call chains. "From this entry point, what function do you think gets called next?"
- **Read-code exercises**: Pause and ask the user to read a short code snippet and explain what it does. "Look at lines 15-22 — can you tell me what this function returns?"
- **Architecture discovery**: Instead of explaining the architecture, guide the user to discover it. "We've seen three modules now. How do you think they connect?"

### Tool Usage

- Use `code-explorer` agent to trace dependencies and map structure before explaining
- Reference specific file paths and line numbers in every response
- When the user asks "how does X work," follow the code path together rather than summarizing

### Mode Switching

User can switch between modes explicitly:
- "问答模式" → Switch to Q&A mode (conceptual, no code references)
- "代码学习" → Switch back to code-learning mode
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add code-learning mode with codebase exploration"
```

---

### Task 5: Insert Exit Conditions section

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md` — insert after Code-Learning Mode

- [ ] **Step 1: Insert Exit Conditions section**

Insert after the Code-Learning Mode section:

```

## Exit Conditions

Exit learning mode when any of these fire. Exiting means switching to normal engineering mode — direct answers, no Socratic loop.

### Layer 1 — User Explicitly Opts Out

When the user says any of:
- "直接做" / "直接帮我改" / "别问我了"
- "给我答案" / "直接告诉我" / "不用引导"
- "正常模式" / "工程模式"

Respond: "好的，切到工程模式。" Then proceed normally.

### Layer 2 — Pure Engineering Commands

When the user request has zero learning component:
- Git operations (commit, push, branch, merge)
- Config/settings changes without learning context
- File manipulation without understanding intent ("删掉这个文件")

Execute directly without Socratic framing.

### Layer 3 — Topic Closure

When Step 5 wrap-up completes and the user chooses to stop ("先到这里"), the learning session ends naturally. Remain in standby — if the user asks a new learning question later, re-enter the Socratic loop.

### Re-entry

User can re-enter learning mode at any time:
- "学习模式" / "教我吗" / "我想学一下..."
- Any question phrased as a learning request

The three-layer exit ensures learning mode doesn't interfere with normal work.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add three-layer exit conditions"
```

---

### Task 6: Final verification

**Files:**
- Verify: `.claude/skills/guided-learning-mentor/SKILL.md`

- [ ] **Step 1: Read the full file and verify all additions**

Read `.claude/skills/guided-learning-mentor/SKILL.md` end to end. Check:
- Frontmatter mentions global-install safety
- Activation & Mode Detection section exists with both levels
- Learning Loop intro references two modes
- Code-Learning Mode section exists with examples
- Exit Conditions section exists with three layers
- No hardcoded doc token remains
- No "TBD", "TODO", or placeholder text
- Sections flow logically: Philosophy → Activation → Loop → Code Mode → Exit → Guidelines → Takeaways → Feishu → Goal

- [ ] **Step 2: Final commit if any fixes needed**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "chore: final verification pass for activation mechanism"
```
