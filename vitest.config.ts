import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ["effector/babel-plugin"],
      // Use .babelrc files
      babelrc: true,
      // Use babel.config.js files
      configFile: true,
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
}); 