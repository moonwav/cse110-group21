# Contributing to Percentage Trip Game (Team 21)

This guide explains how we work together: setting up, picking up work, branching,
opening pull requests, reviewing, and deciding when something is done.

## 1. Setup

You need **Node.js 22.5 or newer** (the database uses Node's built-in `node:sqlite`,
and vitest 5 needs Node 22). Check with `node -v`.

    git clone https://github.com/moonwav/cse110-group21.git
    cd cse110-group21
    npm install
    npm run dev      # start the game
    npm test         # run all tests
    npm run build    # type-check and build, same as CI

**After every `git pull` or branch switch, run `npm install` again.** If someone added a
dependency, your build will fail with errors like `Cannot find type definition file`
until you do.

## 2. Picking up work

All work is tracked on the [GitHub Project](https://github.com/moonwav/cse110-group21/projects/4).

1. Pick a task from the current sprint and assign yourself.
2. Move it to **In Progress**.
3. If the task is bigger than its estimate or unclear, say so in the team chat before
   starting, not after.

One task (or one sub-issue) per branch and per pull request. Small PRs get reviewed
faster.

## 3. Branches

- `main` always builds and passes tests. **Never commit directly to `main`.**
- Create a branch from an up-to-date `main`:

      git checkout main
      git pull
      git checkout -b feature/answer-checker

- Name branches `<type>/<short-description>` in lowercase with hyphens:

  | Type | Use for | Example |
  |---|---|---|
  | `feature/` | New functionality | `feature/hint-button` |
  | `fix/` | Bug fixes | `fix/score-below-zero` |
  | `test/` | Adding or fixing tests only | `test/score-tracker` |
  | `docs/` | Documentation only | `docs/architecture` |
  | `chore/` | Setup, config, dependencies | `chore/ci-node-22` |

- If `main` moves on while you work, update your branch with `git pull origin main`
  and fix any conflicts before asking for review.

## 4. Commits

- Commit often, in small steps that each make sense on their own.
- Write the message as a short command describing what the commit does:
  - Good: `Add hint penalty to ScoreTracker`
  - Bad: `stuff`, `fixed it`, `update`
- Don't commit generated or local files: `node_modules/`, `dist/`, `.env`, or any
  `*.sqlite` database. These are already in `.gitignore`.

## 5. Where code goes

Follow the layers in the [module view](https://www.figma.com/design/QOx6lEtyU4C2QbAcc2jVZ7/Module-View-CSE110).
Dependencies point **downward only**.

| Folder | Layer | May import from |
|---|---|---|
| `src/presentation/` | Screens (Konva) | `src/logic/` |
| `src/logic/` | Game logic: `GameController`, `QuestionGenerator`, `AnswerChecker`, `ScoreTracker` | `src/data/` |
| `src/data/` | Plain data: `QuestionTemplate`, `Question`, `GameState` | nothing |
| `src/backend/` | Server: `ApiRouter`, `Accounts`, `ScoreHolder`, SQLite | Node only |

Rules that keep the design consistent:

- **Screens never do math or scoring.** They call `GameController`, which uses the logic
  modules. This keeps scoring testable without the UI.
- **New question types are new templates.** Add them in the shared template format;
  don't special-case them in the UI or `AnswerChecker`.
- **All score changes go through `ScoreTracker`**, including hint and reveal penalties.
- **Reuse shared UI pieces** (buttons, score display, colors, fonts). Don't copy them
  into your screen. Colors and fonts come from the Figma *Aesthetics* page:
  primary `#4A5A9A`, secondary `#C2CAE9`, text `#000000`, Silkscreen for headings,
  Roboto for body text.
- **Browser code must not import Node-only modules** (`node:sqlite`, `fs`, and so on).
  Keep those in `src/backend/`, or the Vite build will break.

## 6. Tests

- Tests live in `tests/`, mirroring `src/` (for example `src/logic/ScoreTracker.ts` →
  `tests/logic/ScoreTracker.test.ts`).
- Every PR that adds or changes logic, data, or backend code adds or updates tests.
- Test logic directly, without the UI and without randomness. Pass fixed numbers in
  instead of relying on the random question generator.
- Use an in-memory database (`":memory:"`) in database tests, never a real file.
- Run `npm test` and `npm run build` locally before pushing.

## 7. Pull requests

1. Push your branch and open a PR into `main`.
2. Title: what the PR does, like a commit message.
3. In the description include:
   - **What:** a short summary of the change.
   - **Why:** link the issue or task (`Closes #42`).
   - **How to test:** steps a reviewer can follow, including any new setup
     (for example, "run `npm install`, a dependency was added").
   - **Screenshots** for any UI change, next to the matching Figma frame.
4. Request a review from at least one teammate.
5. Wait for the **Tests** check to pass. A PR with a red check is not ready for review.

## 8. Reviewing

As a reviewer:

- Check out the branch, run `npm install`, `npm test`, and `npm run build`, and try the
  change in the game if it affects the UI.
- Check it against the definition of done below and the rules in section 5.
- Comment on specific lines. Be clear about what is required and what is a suggestion
  (prefix suggestions with "nit:" or "optional:").
- Approve when it's ready, or request changes and say exactly what's needed.
- Try to review within **24 hours** of being asked.

As an author:

- Reply to every comment, either with a fix or with a reason.
- Push fixes to the same branch; the PR updates automatically.

## 9. Definition of done

A task is done only when **all** of these are true:

- [ ] The code does what the issue or task describes.
- [ ] New or changed logic has automated tests, and they pass.
- [ ] `npm test` and `npm run build` pass locally and in CI.
- [ ] Code follows the layer rules and shared patterns in section 5.
- [ ] UI changes match the Figma mockup, including error, hint, and reveal states.
- [ ] At least one teammate has reviewed and approved the PR.
- [ ] The PR is merged into `main` and its branch is deleted.
- [ ] The task is moved to **Done** on the GitHub Project.
- [ ] The README or docs are updated if setup, commands, or behavior changed.

## 10. Merging

- The PR author merges after approval and a green check, using **Squash and merge**
  so each PR becomes one commit on `main`.
- Delete the branch after merging.
- After a merge that adds a dependency or changes the Node version, tell the team in
  chat so everyone runs `npm install`.

## 11. Getting help

Stuck for more than an hour? Ask in the team chat. Include what you tried, the exact
error, and the branch name.