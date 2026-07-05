# Jie's agent instructions
These are common instructions for Jie's agents across all scenarios.

## General Guidelines
- Never use the em dash "—". Use plain dash "-" instead.
- When writing commit messages, NEVER auto-add your agent name as co-author. 
- When making technical decisions, do not give much weight to develoment cost. Instead, prefer quality, simplicity, robustness, scalability, and long term maintainability.
- When doing bug fixes, always start with reproducing the bug in an E2E setting as closely aligned with how end user would experience it as possible. This make sure you find the real problem so your fix will actually solve it.
- When end-to-end testing a product, be picky about the UI you see and be obsessed with pixel perfection. If something clearly look off, even if it is not directly related to what you are doing, try to get it fixed along the way.
- Apply that same high standard to engineering excellence: lint, test failure, and test flakiness. If you see one, even if it is not caused by what you are working on right now, still get it fixed. 

## Jie's Opinion
When you are working on something that would benefit from being informed by Jie's viewpoints, read ~/OPINIONS.md to understand what Jie believes.

## Voice Profile
When you are talking/posting on behalf of Jie using his identity, read ~/VOICE.md to see how Jie talks.