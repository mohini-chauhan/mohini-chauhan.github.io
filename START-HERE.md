# Start here

This folder is everything a coding agent needs to build your new 3D portfolio from the control room prototype.

## What's inside

| Path | What it is |
|---|---|
| `AGENTS.md` | Instructions for the coding agent. Most agents in VS Code read it automatically. |
| `CLAUDE.md` | Points Claude Code to `AGENTS.md` |
| `.github/copilot-instructions.md` | Points GitHub Copilot to `AGENTS.md` |
| `docs/` | The full spec: brief, content rules, room, dioramas, UI, architecture, Classic view, quality bar, deployment, the phased plan, open questions and design tokens |
| `src/content/portfolio.ts` | All your content, typed and ready to use. The agent builds everything from this file. |
| `public/images/mohini-photo.jpg` | Your photo (a low-resolution placeholder until you add a better one) |
| `reference/prototype/` | The working prototypes. Open `control-room.html` in a browser. |
| `reference/screenshots/` | 24 screenshots of the prototype: intro, tour, every panel, every diorama, phone layouts |
| `reference/old-portfolio/` | A screenshot of your old site, for reference |

## How to use it

1. **Install Node 22** if you don't have it (`node -v` should show 22 or later).
2. **Create a project folder**, for example `~/Projects/portfolio`, and copy everything from this folder into it, including the hidden `.github` folder.
3. **Make it a git repo** (`git init`) so you can review each change.
4. **Open the folder in VS Code** and open your agent's chat (Copilot agent mode, Claude Code, Cline, Cursor or similar).
5. **Paste this kickoff message:**

   > Read AGENTS.md, then read the docs it lists in order. Open reference/prototype/control-room.html to see the target. Start Phase 0 from docs/10-implementation-plan.md. When Phase 0 is done, stop, summarise what you did, and tell me how to check it.

6. **Review after each phase.** The agent stops after every phase. Check it in the browser, then reply "Go to Phase N" or tell it what to fix.
7. **Answer the open questions** in `docs/11-open-questions.md` when you can, especially your links, resume PDF and role dates. The agent uses safe defaults until then.

## Before you launch

- Add your resume PDF to `public/resume/` and a better square photo to `public/images/`
- Fill in your email and LinkedIn in `src/content/portfolio.ts`
- Make sure you can explain every number on the site in an interview
- Check with your manager that the three work projects can be described publicly at this level of detail
