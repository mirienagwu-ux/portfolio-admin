import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://portfolio-admin-eight-chi.vercel.app',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
