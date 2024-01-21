import fs from "fs";
import type { Plugin as VitePlugin, ResolvedConfig } from "vite";

export default function mainCssBeforeMainJs(): VitePlugin {
  let config: ResolvedConfig;

  return {
    name: "main-css-before-main-js",
    enforce: "post",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const indexHtmlPath = `${config!.build.outDir}/index.html`;
      const html = fs.readFileSync(indexHtmlPath).toString();

      // e.g: <script type="module" crossorigin src="/assets/index-6392265d.js"></script>
      const mainScriptMatch = html.match(
        /(<script type="module" crossorigin src="\/assets\/index-[A-Za-z0-9]+\.js"><\/script>)/,
      );
      if (!mainScriptMatch) {
        throw Error("Could not find main script");
      }
      const origMainScriptHtml = mainScriptMatch[1]!;
      const newMainScriptHtml = origMainScriptHtml.replace("<script", "<script ");

      // e.g: <link rel="stylesheet" crossorigin  href="/assets/index-d64a8d5d.css">
      const mainCssLinkMatch = html.match(
        /(<link rel="stylesheet" crossorigin href="\/assets\/index-[A-Za-z0-9]+\.css">)/,
      );
      if (!mainCssLinkMatch) {
        throw Error("Could not find main css link");
      }
      const origMainCssLinkHtml = mainCssLinkMatch[1]!;
      const newMainCssLinkHtml = origMainCssLinkHtml.replace("<link", "<link ");

      const newHtml = html
        .replace(origMainScriptHtml, newMainCssLinkHtml)
        .replace(origMainCssLinkHtml, newMainScriptHtml);

      fs.writeFileSync(indexHtmlPath, newHtml);
    },
  };
}
