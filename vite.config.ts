import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 일반 REST API 프록시
      'api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // WebSocket 프록시 (STOMP 통신용)
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },
  },
});
