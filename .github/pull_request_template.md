<!--
PR title: say what the PR does, like a commit message ("Add hint penalty to ScoreTracker").
Text inside these arrows is hidden on GitHub. Fill in each section; delete nothing.
See docs/CONTRIBUTING.md for the full process.
-->

## Linked issue

Closes #
<!-- Use "Closes #42" so the issue closes automatically when this PR merges. -->

## What changed

<!-- A short summary of the change and why it's needed. -->

-

## How to test

<!-- Steps a reviewer can follow. Mention any new setup, such as "run npm install, a dependency was added". -->

1. `npm install`
2. `npm test`
3.

## Tests added

<!-- List the test files you added or changed. If none, explain why (for example, docs-only change). -->

-

## Screenshots

<!-- For UI changes: a screenshot next to the matching Figma frame. Otherwise write "N/A". -->

## Reviewer

<!-- @mention who should review, and also add them under "Reviewers" on the right. -->

@

## Checklist

- [ ] `npm test` passes locally
- [ ] `npm run build` passes locally
- [ ] New or changed logic has tests
- [ ] Code follows the layer rules in docs/CONTRIBUTING.md (screens don't do scoring, no Node-only imports in browser code)
- [ ] UI changes match the Figma mockup, including error, hint, and reveal states
- [ ] README or docs updated if setup, commands, or behavior changed
- [ ] The **Tests** check is green on this PR