import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
    coverage: {
      include: ['src/'],
      exclude: ['**/main.jsx']
    }
  }
})
