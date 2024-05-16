import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          '404.html': ['./404.html'], // Copy 404.html to the root folder
        },
      },
    },
  },
})
