# Jie workflow rebuild
## Initial mandatory setup
1. Install GH cli, Sublime merge, az cli, git bash.
1. Install Wezterm from `https://wezterm.org/index.html`. Then add `..\.wezterm.lua` as custom config file.
1. Install 'Hack Nerd Font'. My lua config file need this as prerequisite.
1. Add `..\AGENTS.md` as Global Memory File under `$env:USERPROFILE`.
1. Create symbolic link for claude code. it used a different path for global memory file): `New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.claude\CLAUDE.md" -Target "$env:USERPROFILE\AGENTS.md"`.
1. Add `..\Opinion.md` under `$env:USERPROFILE` to persist your taste. My AGENTS.md need this.
1. Add `..\VOICE.md` under `$env:USERPROFILE` as voice profile. My AGENTS.md need this.
1. Add Lavish skill for code planning: `npx skills add kunchenguid/lavish-axi --skill lavish`.
1. Install no-mistake. It will be used after agents complete code generation: `irm https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.ps1 | iex`.
1. Install Good night, have fun: `npm install -g gnhf`. This is used to do long running task.

## Later optional setup
1. Install Tmux.
1. Install NeoVIM.
1. Voice input using Whisper.
1. Install Treehouse for git worktree.
1. Install firstmate.