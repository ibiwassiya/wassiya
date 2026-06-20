import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import ScrollToTop from '@/components/ScrollToTop'
import { GlobalProvider } from '@/lib/context/GlobalContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wasiyya — Islamic Estate Planning',
  description: 'Faraid-compliant, solicitor-reviewed Islamic wills for UK Muslim families. Guided, affordable, and built with scholars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <GlobalProvider>
          <ScrollToTop />
          <Nav />
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
