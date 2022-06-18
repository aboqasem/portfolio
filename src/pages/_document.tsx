import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body className="duration-75 motion-safe:transition-colors bg-zinc-50 dark:bg-zinc-900">
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
