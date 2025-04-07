import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
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
})
