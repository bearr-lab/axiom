# AXIOM

AXIOM is a browser-only, offline-first STEAM competency assessment for Classes 3-12. It uses linked, fictional systems scenarios to generate a transparent **projected benchmark** from provisional class-and-competency reference distributions.

## Run locally

```powershell
npm install
npm run dev
```

Open the displayed local address. There is no account, backend, network API, database, or telemetry. The application works from its bundled content after its first local load.

## Persistence and privacy

AXIOM stores one learner profile, assessment progress, and completed result snapshot in browser `localStorage`. A refresh resumes from the next unlocked item. Use **Erase local data** on the dashboard to remove the profile, progress, and saved results after confirmation.

## Benchmark limitation

Scores use provisional expert-authored reference distributions for the selected class and competency. A result is a projection, not a validated global rank or an empirical international comparison.

## Verify

```powershell
npm test -- --run
npm run build
npm run e2e -- --project=chromium
```

If Chromium is not installed for Playwright, run:

```powershell
npx playwright install chromium
```
