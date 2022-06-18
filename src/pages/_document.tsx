import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* runs before hydration to avoid color ficker  */}
        <Script
          id="configure-theme"
          strategy="beforeInteractive"
          src="/js/theme/configure-theme.js"
        />
      </Head>

      <body className="duration-75 motion-safe:transition-colors bg-zinc-50 dark:bg-zinc-900">
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
