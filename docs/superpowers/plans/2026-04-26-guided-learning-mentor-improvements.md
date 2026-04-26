# Guided Learning Mentor Improvements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 4 improvements to the guided-learning-mentor skill: exit conditions, softened word limit, key takeaways, and decoupled Feishu token.

**Architecture:** Single file edit to `.claude/skills/guided-learning-mentor/SKILL.md`. Six targeted edits: modify Steps 3 and 4, add Step 5, soften word limit, replace memorizable patterns, and rewrite Feishu integration.

**Tech Stack:** Markdown skill file, no code dependencies.

---

### Task 1: Modify Step 3 — Add exit signal language

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:37-44`

- [ ] **Step 1: Edit Step 3 to note its role in exit detection**

Replace:

```
### Step 3: Comprehension Check — Verify Understanding

After explaining, **immediately** check comprehension. Do not assume they understood.

Ask one of:
- "Can you explain that back to me in your own words?"
- "If you encountered [specific scenario], how would you apply what we just talked about?"
- "How does [new concept A] differ from [related concept B] that we learned earlier?"
```

With:

```
### Step 3: Comprehension Check — Verify Understanding

After explaining, **immediately** check comprehension. Do not assume they understood.

Ask one of:
- "Can you explain that back to me in your own words?"
- "If you encountered [specific scenario], how would you apply what we just talked about?"
- "How does [new concept A] differ from [related concept B] that we learned earlier?"

If the user answers correctly and does not follow up with a new question, treat this as **exit signal 1** (understanding confirmed for this sub-topic).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add exit signal to Step 3 comprehension check"
```

---

### Task 2: Modify Step 4 — Add exit signals and link to Step 5

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:46-49`

- [ ] **Step 1: Edit Step 4 to add exit signals**

Replace:

```
### Step 4: Adaptive Follow-up — Match Their Pace

- **If they got it**: Affirm their understanding, then advance to deeper related concepts or a new topic.
- **If they're confused**: Do NOT repeat the same explanation. Try a different angle — new analogy, smaller steps, more concrete example.
```

With:

```
### Step 4: Adaptive Follow-up — Match Their Pace

- **If they got it**: Affirm their understanding. Ask whether they want to go deeper or wrap up.
- **If they're confused**: Do NOT repeat the same explanation. Try a different angle — new analogy, smaller steps, more concrete example.
- **Exit signal 2 —追问枯竭**: If the user gives only confirmatory replies ("懂了""明白了") for 2 consecutive rounds without asking new questions, the topic has run its course. Proceed to Step 5.
- **Exit signal 3 —话题闭环**: If a learning goal was stated up front ("搞懂 X"), when all sub-topics of X are covered, proceed to Step 5.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add exit signals to Step 4 adaptive follow-up"
```

---

### Task 3: Add Step 5 — Wrap-up

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md` — insert after Step 4

- [ ] **Step 1: Insert Step 5 after Step 4**

Insert after line 49 (after Step 4 block):

```

### Step 5: Wrap-up — Consolidate & Offer Closure

When any exit signal fires, wrap up the current topic before moving on:

1. **Key takeaways**: Summarize 2-3 core points from the topic in a short list.
2. **Memorable rules**: If the topic has rules, formulas, or patterns worth remembering, list them in a bulleted format. If it doesn't, skip this — don't force it.
3. **Closure check**: Ask "想继续深入相关话题，还是先到这里？"

The user decides whether to continue. A wrap-up is a proposal, not a unilateral end.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: add Step 5 wrap-up with exit conditions"
```

---

### Task 4: Soften word limit to guideline

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:65-70`

- [ ] **Step 1: Rewrite Response Length Discipline**

Replace:

```
## Response Length Discipline

Keep each response focused and digestible:
- **Core message**: 100–200 words
- **If more detail is needed**: Split across multiple messages, each building on the last
- **After 3 messages on same topic**: Pause and check in ("Does this make sense so far? Shall we keep going deeper?")
```

With:

```
## Response Length Discipline

Keep each response focused and digestible:
- **Core message**: Aim for 100–200 words
- **宁整不碎**: If a concept genuinely needs 300–400 words to be complete, keep it intact. Coherent understanding matters more than hitting a word count.
- **If more detail is needed**: Split across multiple messages, each building on the last
- **After 3 messages on same topic**: Pause and check in ("Does this make sense so far? Shall we keep going deeper?")
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: soften word limit from hard cap to soft guideline"
```

---

### Task 5: Replace Memorizable Patterns with Key Takeaways

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:82-84`

- [ ] **Step 1: Rewrite section**

Replace:

```
## Memorizable Patterns (Always Include)

At the end of every answer, if there are fixed patterns, formulas, or rules the user can memorize to speed up problem-solving, **always list them** in a clear, bulleted format. This helps users build a mental toolkit for exams and practical work.
```

With:

```
## Key Takeaways

At the end of each topic, summarize the most important points as a short list. If the topic has fixed rules, formulas, or patterns worth remembering, include them. If it doesn't, a simple conceptual summary is enough — don't force formula-like takeaways where none exist. Use your judgment.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: replace memorizable patterns with flexible key takeaways"
```

---

### Task 6: Decouple Feishu token

**Files:**
- Modify: `.claude/skills/guided-learning-mentor/SKILL.md:86-103`

- [ ] **Step 1: Rewrite Feishu Document Sync section**

Replace:

```
## Feishu Document Sync

After listing memorizable patterns (**固定套路**), you MUST ask the user:

> "是否要把这些固定套路添加到你的飞书文档中？"

If they say yes, use the lark-cli to append the content. **关键规则：所有飞书写入操作必须在后台运行（run_in_background=True），不得在对话中展示 Bash 命令和 API 调用细节。** The user's Feishu doc is:

- Doc token: KpWaw3uhliihWAkkXJhcuoOGnyc
- Use `lark-cli docs +update` with `--mode insert_after` and `--selection-by-title` targeting the appropriate section heading

**默认写入格式（严格遵循）：**
```markdown
# 章节标题
- **加粗关键词**：解释说明
- **加粗关键词**：解释说明
```
每个知识点作为一个独立章节（`# 标题`），内容用无序列表项，关键词加粗，冒号后接解释。不要使用表格、代码块或其他格式。
```

With:

```
## Feishu Document Sync

### First-Time Setup

When the skill activates for the first time (no Feishu token found in `.claude/settings.local.json`), ask:

> "我支持把学习笔记同步到飞书文档。要绑定吗？只需提供你的飞书文档链接（或 token），之后每次学习结束我都可以帮你自动归档要点。"

If the user provides a token or doc link, extract the doc token and write it to `.claude/settings.local.json`:

```json
{
  "guided-learning-mentor": {
    "feishuDocToken": "<extracted-token>"
  }
}
```

### Per-Session Sync

After key takeaways are listed, ask:

> "是否要把这些要点同步到你的飞书文档中？"

If yes, read the token from `.claude/settings.local.json` and use `lark-cli docs +update` with `--mode insert_after` and `--selection-by-title` targeting the appropriate section heading.

**关键规则：所有飞书写入操作必须在后台运行（run_in_background=True），不得在对话中展示 Bash 命令和 API 调用细节。**

**默认写入格式（严格遵循）：**
```markdown
# 章节标题
- **加粗关键词**：解释说明
- **加粗关键词**：解释说明
```
每个知识点作为一个独立章节（`# 标题`），内容用无序列表项，关键词加粗，冒号后接解释。不要使用表格、代码块或其他格式。
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "feat: decouple Feishu token with first-time setup flow"
```

---

### Task 7: Final verification

**Files:**
- Verify: `.claude/skills/guided-learning-mentor/SKILL.md`

- [ ] **Step 1: Read the full file and verify all four improvements**

Read `.claude/skills/guided-learning-mentor/SKILL.md` end to end. Check:
- Step 5 exists with wrap-up logic
- Word limit is "Aim for" not hard cap, includes "宁整不碎"
- "Memorizable Patterns" heading replaced with "Key Takeaways"
- Feishu section starts with "First-Time Setup" and no hardcoded token
- No "TBD", "TODO", or placeholder text

- [ ] **Step 2: Final commit if any fixes were needed**

```bash
git add .claude/skills/guided-learning-mentor/SKILL.md
git commit -m "chore: final verification pass"
```
