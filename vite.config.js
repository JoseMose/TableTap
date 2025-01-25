import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/TableTap/', // Add this line
  plugins: [vue()],
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})