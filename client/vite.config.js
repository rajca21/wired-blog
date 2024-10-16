import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8000', secure: false },
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000, // Set the limit to 1MB (1000 kB)
  },
});
