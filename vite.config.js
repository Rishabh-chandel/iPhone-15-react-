import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "army-institute-of-technology",
    project: "javascript-react",
    url: "https://sentry.io/"
  }), sentryVitePlugin({
    org: "army-institute-of-technology",
    project: "javascript-react",
    url: "https://sentry.io/"
  })],

  build: {
    sourcemap: true
  }
})