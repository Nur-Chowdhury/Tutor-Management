import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  envDir: '../',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174', // backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['axios']
  }
})


