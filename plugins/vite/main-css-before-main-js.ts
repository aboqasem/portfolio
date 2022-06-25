import fs from 'fs';
// eslint-disable-next-line no-redeclare
import { Plugin, ResolvedConfig } from 'vite';

export default function mainCssBeforeMainJs(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'preload-index-css',
    enforce: 'post',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const indexHtmlPath = `${config!.build.outDir}/index.html`;

      const html = fs.readFileSync(indexHtmlPath).toString();

      // e.g: <script type="module" crossorigin src="/assets/index.6392265d.js"></script>
      const indexScriptMatch = html.match(
        /(<script type="module" crossorigin src="\/assets\/index\.[A-Za-z0-9]+\.js"><\/script>)/,
      );
      if (!indexScriptMatch) {
        throw Error('Could not find index script');
      }
      const origIndexScriptHtml = indexScriptMatch[1]!;
      const newIndexScriptHtml = origIndexScriptHtml.replace('<script', '<script ');

      // e.g: <link rel="stylesheet" href="/assets/index.d64a8d5d.css">
      const indexCssLinkMatch = html.match(
        /(<link rel="stylesheet" href="\/assets\/index\.[A-Za-z0-9]+\.css">)/,
      );
      if (!indexCssLinkMatch) {
        throw Error('Could not find index css link');
      }

      const origIndexCssLinkHtml = indexCssLinkMatch[1]!;
      const newIndexCssLinkHtml = origIndexCssLinkHtml.replace('<link', '<link ');

      const newHtml = html
        .replace(origIndexScriptHtml, newIndexCssLinkHtml)
        .replace(origIndexCssLinkHtml, newIndexScriptHtml);

      fs.writeFileSync(indexHtmlPath, newHtml);
    },
  };
}
