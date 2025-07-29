import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all interfaces
    port: 10000, // Render’s default port (avoid reserved ports 18012, 18013, 19099)
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
  },
});