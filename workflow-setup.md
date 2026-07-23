# Jie workflow rebuild
## Initial mandatory setup
1. Install GH cli, Sublime merge, az cli, git bash, claude code cli.
1. Create a `clauded` shortcut for `claude --dangerously-skip-permissions`. Save this as `clauded.cmd` in `$env:USERPROFILE\.local\bin`, the folder that already holds `claude.exe` and is already on PATH:

   ```cmd
   @echo off
   "%~dp0claude.exe" --dangerously-skip-permissions %*
   ```

   `%~dp0` pins the wrapper to its sibling `claude.exe` instead of re-searching PATH, and `%*` forwards extra args so `clauded -c` and `clauded --model opus` still work. A `.cmd` resolves through PATHEXT, so it runs from cmd, PowerShell, and Wezterm alike. Note this skips every tool permission prompt, so keep it for sandboxes and throwaway repos.
1. Install Wezterm from `https://wezterm.org/index.html`. Then add `..\.wezterm.lua` as custom config file. If Wezterm starts but no window ever appears, add this section before the final `return config`:

   ```lua
   -- This VM (Hyper-V over RDP) exposes only OpenGL 1.1 (generic GDI), which the
   -- default glium/OpenGL front end rejects as "too old", so the window failed to
   -- open. WebGpu uses a software DX adapter instead and works here.
   config.front_end = "WebGpu"
   ```

   Only add it on a VM or RDP session with no real GPU passthrough. On a physical box leave it out so Wezterm keeps its faster default front end, which is why this is not baked into the checked-in `.wezterm.lua`.
1. Install 'Hack Nerd Font'. My lua config file need this as prerequisite.
1. Add `..\AGENTS.md` as Global Memory File under `$env:USERPROFILE`.
1. Create symbolic link for claude code. it used a different path for global memory file): `New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.claude\CLAUDE.md" -Target "$env:USERPROFILE\AGENTS.md"`.
1. Add `..\OPINIONS.md` under `$env:USERPROFILE` to persist your taste. My AGENTS.md need this.
1. Add `..\VOICE.md` under `$env:USERPROFILE` as voice profile. My AGENTS.md need this.
1. Add `..\statusline.js` under `$env:USERPROFILE\.claude\` for a custom status line showing model, folder, git branch, context-usage bar, session cost, and elapsed time. Then register it in `$env:USERPROFILE\.claude\settings.json`:

   ```json
   "statusLine": {
     "type": "command",
     "command": "node C:/Users/<username>/.claude/statusline.js"
   }
   ```

   The path must be absolute and spelled out, since settings.json does not expand `$env:USERPROFILE`. Use forward slashes so the command parses identically in cmd, PowerShell, and bash. Node runs the script directly rather than a bash wrapper because on a stock Windows box `bash` resolves to the WSL stub in `system32`, and WSL git cannot read a `Q:\...` style path, which silently drops the branch. Requires Node on PATH.
1. Add Lavish skill for code planning: `npx skills add kunchenguid/lavish-axi --skill lavish -g`. The `-g` installs it globally (user-level) so it is available everywhere; without it the skill installs into whatever directory you run the command from.
1. Install no-mistake. It will be used after agents complete code generation: `irm https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.ps1 | iex`.
1. Install Good night, have fun: `npm install -g gnhf`. This is used to do long running task.
1. Install Herdr from `https://herdr.dev/`: `irm https://herdr.dev/install.ps1 | iex`. It is a terminal agent multiplexer that runs every coding agent from one interface and keeps them alive on the server after you close the terminal or disconnect, so you can attach and detach over SSH and reach the herd from a phone. Unlike tmux it understands agent state (blocked, working, done, idle). Windows support is still preview, so expect rough edges. Installs to `$env:USERPROFILE\AppData\Local\Programs\Herdr\bin` and adds itself to PATH.
1. Install Treehouse for git worktree: `irm https://kunchenguid.github.io/treehouse/install.ps1 | iex`. It manages a reusable pool of git worktrees so you or an agent can grab an isolated checkout instantly instead of cloning the repo again, which keeps dependencies and build caches warm. Run `treehouse` to take a worktree and drop into a subshell, `treehouse status` to see the pool, and `treehouse return <path>` to reset one back. No daemon, state lives in a small on-disk file.

## Later optional setup
1. Install Tmux.
1. Install NeoVIM.
1. Voice input using Whisper.
1. Install firstmate.