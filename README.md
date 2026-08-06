# Shweta & Siddarth — Wedding Website

A single-page wedding site. Built with Astro, Tailwind
CSS, and Framer Motion; deployed free on GitHub Pages; RSVPs saved to a
Google Sheet via Apps Script.

## Local development

```sh
npm install
npm run dev
```

## Editing content

Section content lives in `src/components/` — each section is its own file
(`Hero.tsx`, `OurStory.astro`, `Events.astro`, `Venue.astro`, `Travel.astro`,
`AttireFaq.astro`, `Registry.astro`, `RsvpSection.astro`). Anything wrapped in
`[brackets]` is placeholder copy meant to be replaced.

## RSVP backend setup

The RSVP form needs a Google Apps Script Web App URL to save submissions.
See `google-apps-script/SETUP.md` for the one-time setup, then:

- Locally: copy `.env.example` to `.env` and set `PUBLIC_GAS_URL`.
- For deploys: add `PUBLIC_GAS_URL` as an Actions **variable** in the repo's
  Settings → Secrets and variables → Actions.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo's Settings → Pages, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and
   deploys automatically. The site will be live at
   `https://<your-username>.github.io/<repo-name>/`.
