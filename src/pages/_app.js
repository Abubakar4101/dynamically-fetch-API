import '@/styles/globals.css'
import { Exo } from 'next/font/google'
import Head from "next/head";

const exo = Exo({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
      <>
          <Head>
              <title>Real Fetch</title>
              <script async
                      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9014256326835255"
                      crossOrigin="anonymous">
              </script>
          </Head>
          <main className={`${exo.className}`}>
            <Component {...pageProps} />
          </main>
      </>
  )
}
