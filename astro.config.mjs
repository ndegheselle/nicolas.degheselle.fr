import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "http://nicolas.degheselle.fr",
  integrations: [svelte()]
});