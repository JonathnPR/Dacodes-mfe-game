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
      '@dacodes/shell/AppProvider': resolve(__dirname, '../shell/src/components/AppProvider.tsx'),
      '@dacodes/shell/httpClient': resolve(__dirname, '../shell/src/config/http.client.ts'),
      '@dacodes/shell/queryClient': resolve(__dirname, '../shell/src/config/query.client.ts'),
      '@dacodes/shell/useNotify': resolve(__dirname, '../shell/src/hooks/useNotify.tsx'),
      'react': resolve(__dirname, '../../../node_modules/react'),
      'react-dom': resolve(__dirname, '../../../node_modules/react-dom'),
    },
  },
}); 