import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import solidPlugin from "vite-plugin-solid";
import mainCssBeforeMainJs from "./plugins/vite/main-css-before-main-js";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		solidPlugin() as unknown as Plugin,
		tailwindcss(),
		ViteMinifyPlugin({ minifyJS: true }) as unknown as Plugin,
		mainCssBeforeMainJs(),
	],
});
