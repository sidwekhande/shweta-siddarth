// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// GITHUB_REPOSITORY is set automatically in GitHub Actions ("owner/repo"),
// so Pages deploys get the right base path with no manual config.
const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isRootSite = repo?.endsWith('.github.io');

// https://astro.build/config
export default defineConfig({
  site: owner ? `https://${owner}.github.io` : undefined,
  base: repo && !isRootSite ? `/${repo}` : '/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});