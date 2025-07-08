import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@solana/spl-token',
      'buffer',
      'stream',
      'assert',
      'util',
    ],
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      assert: 'assert',
    },
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});