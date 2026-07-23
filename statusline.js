#!/usr/bin/env node
// Claude Code status line.
// Reads the status JSON on stdin, prints one ANSI-colored line on stdout.
// Layout: [model]  folder  branch  [context bar] pct%  cost  duration

const path = require('path');
const { execFileSync } = require('child_process');

const RED = '\x1b[0;31m';
const YELLOW = '\x1b[0;33m';
const GREEN = '\x1b[0;32m';
const BLUE = '\x1b[1;34m';
const WHITE = '\x1b[0;37m';
const RESET = '\x1b[0m';

function readStdin() {
  try {
    return require('fs').readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function gitBranch(cwd) {
  try {
    const branch = execFileSync('git', ['-C', cwd, 'branch', '--show-current'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      windowsHide: true,
      timeout: 1000,
    }).trim();
    return branch || ''; // empty on detached HEAD
  } catch {
    return ''; // not a repo, or git unavailable
  }
}

function formatDuration(ms) {
  const total = Math.floor((Number(ms) || 0) / 1000);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return mins > 0 ? `${mins}m${secs}s` : `${secs}s`;
}

function main() {
  let d = {};
  try {
    d = JSON.parse(readStdin()) || {};
  } catch {
    d = {};
  }

  const model = (d.model || {}).display_name || '?';
  const cwd = (d.workspace || {}).current_dir || d.cwd || '?';
  const cost = (d.cost || {}).total_cost_usd || 0;
  const durationMs = (d.cost || {}).total_duration_ms || 0;

  // Clamp so a >100% or negative reading can never break the bar math.
  const pct = Math.min(100, Math.max(0, Math.round((d.context_window || {}).used_percentage || 0)));

  const barColor = pct >= 90 ? RED : pct >= 70 ? YELLOW : GREEN;
  const filled = Math.floor(pct / 10);
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);

  const folder = path.basename(cwd) || cwd;

  const branch = gitBranch(cwd);
  const branchStr = branch ? `${WHITE} \u{1F33F} ${branch}${RESET}` : '';

  const costStr = `$${Number(cost).toFixed(4)}`;

  process.stdout.write(
    `${BLUE}[${model}]${RESET}  ` +
      `${WHITE}\u{1F4C1} ${folder}${RESET}${branchStr}  ` +
      `${barColor}[${bar}] ${pct}%${RESET}  ` +
      `${WHITE}\u{1F4B0} ${costStr}${RESET}  ` +
      `${WHITE}⏱ ${formatDuration(durationMs)}${RESET}`
  );
}

main();
