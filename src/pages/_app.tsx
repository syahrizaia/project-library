import AppShell from '@/components/layouts/AppShell'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Perpustakaan WIR | Untuk Semua Kebutuhan Membaca</title>
        <meta name="description" content="Perpustakaan WIR adalah tempat membaca buku terbaik yang berada di Cikarang. Semua pilihan buku tersedia untuk kalian yang gemar membaca." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Perpustakaan WIR | Untuk Semua Kebutuhan Membaca" />
        <meta property="og:description" content="Tempat membaca buku terbaik di Cikarang dengan koleksi lengkap." />
        <meta property="og:type" content="website" />
      </Head>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </>
  )
}