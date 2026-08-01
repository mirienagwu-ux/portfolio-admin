import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://portfolio-admin-eight-chi.vercel.app',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
