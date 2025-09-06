import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // كل طلب يبدأ بـ /api يتم توجيهه للسيرفر على 5001
      '/api': {
        target: 'http://localhost:5001', // السيرفر الخلفي
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
