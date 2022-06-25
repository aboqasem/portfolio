import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import minifyHtmlPlugin from 'vite-plugin-minify';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import mainCssBeforeMainJs from './plugins/vite/main-css-before-main-js';

export default defineConfig({
  plugins: [
    eslintPlugin(),
    tsconfigPathsPlugin(),
    solidPlugin(),
    minifyHtmlPlugin({ minifyJS: true }),
    mainCssBeforeMainJs(),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
