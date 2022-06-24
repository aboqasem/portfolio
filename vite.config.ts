import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [eslintPlugin(), tsconfigPathsPlugin(), solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
