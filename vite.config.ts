import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import minifyHtmlPlugin from 'vite-plugin-minify';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    eslintPlugin(),
    tsconfigPathsPlugin(),
    solidPlugin(),
    minifyHtmlPlugin({ minifyJS: true }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
