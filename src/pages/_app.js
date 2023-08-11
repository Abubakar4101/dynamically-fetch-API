import '@/styles/globals.css'
import { Exo } from 'next/font/google'
import Head from "next/head";

const exo = Exo({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
      <>
          <Head>
              <title>Real Fetch</title>
          </Head>
          <main className={`${exo.className}`}>
            <Component {...pageProps} />
          </main>
      </>
  )
}
