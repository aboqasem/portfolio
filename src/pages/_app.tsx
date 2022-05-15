import { Background } from '@/components/Background';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Mohammad Al Zouabi</title>
        <meta content="Personal website" name="description" />
      </Head>

      <div className="font-serif">
        <Background />
        <Component {...pageProps} />
      </div>
    </>
  );
}
