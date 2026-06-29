# AgenticWorkflow

A portable, reproducible setup for my (Jie's) agentic development workflow — the terminal, the
agent memory, and the tooling I rebuild on any new machine to work effectively with coding agents.

This repo is the source of truth. Clone it onto a fresh machine, follow
[`workflow-setup.md`](workflow-setup.md), and the environment comes back exactly as it was.

## What's in here

| File | Purpose |
| --- | --- |
| [`workflow-setup.md`](workflow-setup.md) | The setup checklist — run through it top to bottom to rebuild the workflow. |
| [`AGENTS.md`](AGENTS.md) | Global agent memory. Installed to `$env:USERPROFILE` so every agent (Claude Code, Codex, etc.) shares the same baseline instructions. |
| [`OPINIONS.md`](OPINIONS.md) | My viewpoints. Agents read this when a task benefits from my taste and judgment. |
| [`VOICE.md`](VOICE.md) | My voice profile. Agents read this when writing or posting under my identity. |
| [`.wezterm.lua`](.wezterm.lua) | WezTerm terminal config (font, color scheme, keybindings). |

These files reference each other: `AGENTS.md` points agents to `OPINIONS.md` for *what I believe* and
`VOICE.md` for *how I say it*.

## Setup

Full steps are in [`workflow-setup.md`](workflow-setup.md). The shape of it:

1. **Core tools** — GitHub CLI, Sublime Merge, Azure CLI, Git Bash.
2. **Terminal** — WezTerm + Hack Nerd Font, using [`.wezterm.lua`](.wezterm.lua) as the config.
3. **Agent memory** — place [`AGENTS.md`](AGENTS.md), [`OPINIONS.md`](OPINIONS.md), and
   [`VOICE.md`](VOICE.md) under `$env:USERPROFILE`. Claude Code reads `~/.claude/CLAUDE.md`, so it gets
   a symlink to `AGENTS.md`:

   ```powershell
   New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.claude\CLAUDE.md" -Target "$env:USERPROFILE\AGENTS.md"
   ```

4. **Agent tooling** — Lavish (planning), no-mistakes (post-generation review), gnhf (long-running
   tasks).

Optional later additions (tmux, Neovim, Whisper voice input, Treehouse, firstmate) are listed at the
bottom of the setup doc.

## Why this exists

I treat the agentic workflow as infrastructure worth versioning. Keeping the config, the agent
memory, and the rebuild steps in one repo means a new machine is a clone-and-follow away from a
fully working setup — no rediscovering which tools, which order, or which settings.
