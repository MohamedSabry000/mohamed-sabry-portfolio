/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/ (see the build:pages script).
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: false },
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
