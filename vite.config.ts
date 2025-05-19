import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@vapi-ai/web']
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});