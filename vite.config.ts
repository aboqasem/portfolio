import { type Plugin, defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import solidPlugin from "vite-plugin-solid";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import mainCssBeforeMainJs from "./plugins/vite/main-css-before-main-js";

export default defineConfig({
  plugins: [
    tsconfigPathsPlugin(),
    solidPlugin() as unknown as Plugin,
    ViteMinifyPlugin({ minifyJS: true }) as unknown as Plugin,
    mainCssBeforeMainJs(),
  ],
});
