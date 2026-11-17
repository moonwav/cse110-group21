# Percentage Trip Game (Team 21)

A browser game where middle schoolers spend a day on a trip and answer ten
percentage questions about food, activities, and shopping. Players earn points
toward a score out of 100, can use hints (at a point cost), and get a letter
grade at the end.

## Learning goal

Players learn to correctly calculate percentages of integer and decimal
numbers, including percent increases and decreases (discounts, tax, tips).

**Audience:** middle schoolers with a basic understanding of fractions.

## How the game works

- One trip = 10 questions: 4 easy, 3 medium, 3 hard.
  - Easy: one step, whole-dollar amounts (e.g., 25% of $80)
  - Medium: two steps (e.g., discount, then subtract)
  - Hard: three or more steps or comparing options, with decimal prices
- Every question has one numeric answer (no multiple choice).
- A perfect run with no hints totals 100 points. Harder questions are worth more.
- A running numeric score is shown during play; the letter grade is revealed at the end.
- Stuck players can use a Hint (costs points), then Reveal Answer (costs more).
- Replaying generates the same kinds of questions with new numbers.
- Mini-game: match percentage problems to their results before a timer runs out.

Full details: [Game vision and decisions](docs/decisions.md) 

## Tech stack

- Frontend: TypeScript + Konva
- Backend: Node.js
- Persistent storage: SQLite
- Tests: Vitest

## Quick start


    git clone https://github.com/moonwav/cse110-group21.git
    cd cse110-group21
    npm install
    npm run dev      # start the game
    npm test         # run all tests

## Project structure


| Folder | Contents |
|---|---|
| `src/main.ts` | `Game`: creates the stage and every controller, and switches screens |
| `src/types.ts` | Shared types: `View`, `Controller`, `Screen`, `ScreenSwitcher` |
| `src/constants.ts` | Shared colors and fonts |
| `src/screens/<Screen>/` | One folder per screen (`MainMenu`, `EnterName`, `Info`, `Options`, `Question`, `Result`, `AnswerKey`, `Minigame`) with its `<Screen>View` and `<Screen>Controller`, plus any model only that screen uses |
| `src/model/` | Shared game state and rules: `GameModel`, `Question`, `questionGenerator`, `questionTemplates`, `answerChecker`, `scoreTracker`, `formulas` |
| `src/backend/` | Node-only SQLite code: `database.ts`, `schema.ts` |
| `src/styles/` | CSS loaded by `index.html` |
| `tests/` | Automated tests, in the same folders as `src/` |
| `docs/` | Architecture documentation |

## Documentation

| Document | What it covers |
|---|---|
| [Architecture](docs/Architecture.md) | Quality attribute scenarios, dynamic and static views, component glossary, design walkthroughs |
| [Decisions](docs/decisions.md) | Why we made key design and scope choices |
| [Contributing](CONTRIBUTING.md) | Branching, pull requests, definition of done |
| [Figma mockups](https://www.figma.com/design/bQuWbczVU3FqEZtMuZA6Tx/CSE-110-Mockup?node-id=0-1&t=fXMIbBTT8kAez9Qe-0) | UI screens, including error and hint paths |
| [Module view (Figma)](https://www.figma.com/design/QOx6lEtyU4C2QbAcc2jVZ7/Module-View-CSE110?node-id=0-1&t=yPAnapl2EZCjIfL0-1) | Static architecture diagram |
| [GitHub Project](https://github.com/users/moonwav/projects/4/views/1) | User stories, tasks, estimates, priorities |


## Team (Team 21)

| Member | Role |
|---|---|
| Aarav | (TODO: add role) |
| Akari | (TODO: add role) |
| Nicole | (TODO: add role) |
| Matthew | (TODO: add role) |
| William | (TODO: add role) |
