// filepath: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TableTap/', // Set the base path to your repository name
  plugins: [react()],
})