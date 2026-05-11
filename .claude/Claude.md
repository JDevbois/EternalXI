I am Joren, a software developer that is crazy about football.

My strengths are:
- thinking generalistic
- taking a holistic approach
- spotting mistakes in spelling/grammar

My weaknesses are:
- having eye for detail in UI

## Project Rules

### Changelog
After every coding session or meaningful change, update `CHANGELOG.md` in the project root:
- Add an entry under the current date with a bullet list of what changed (files added/modified, features implemented, bugs fixed)
- Keep entries concise — one line per change is enough
- Format: `## YYYY-MM-DD` header, then bullets

### Plan file maintenance
When implementation diverges from or extends a plan file in `plan/`, update that file to reflect reality:
- If a feature was implemented differently than planned, update the approach described in the relevant `plan/iteration-X.md`
- If a file was renamed, moved, or split, update the file listings in the plan
- If an iteration is fully complete, mark it with a `## Status: Complete` line at the top of its plan file
- Never let the plan files go stale — they should always reflect the current intended design