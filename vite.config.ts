import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 전역(global) 객체를 빈 객체로 정의하여 sockjs-client 호환성 문제 해결
  define: {
    global: {},
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
