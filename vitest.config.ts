import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@dacodes/shell/AppProvider': resolve(__dirname, '../../shell/src/components/AppProvider'),
      '@dacodes/shell/httpClient': resolve(__dirname, '../../shell/src/config/http.client'),
      '@dacodes/shell/queryClient': resolve(__dirname, '../../shell/src/config/query.client'),
      '@dacodes/shell/useNotify': resolve(__dirname, '../../shell/src/hooks/useNotify'),
    },
  },
}); 