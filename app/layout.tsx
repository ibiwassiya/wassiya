import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Geist } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import ScrollToTop from '@/components/ScrollToTop'
import { GlobalProvider } from '@/lib/context/GlobalContext'
import { cn } from "@/lib/utils"
import { createClient } from '@/lib/supabase/server'

const ROLE_DASHBOARDS: Record<string, string> = {
  client:    '/portal',
  advisor:   '/advisor',
  solicitor: '/solicitor',
  scholar:   '/scholar',
  admin:     '/admin',
}

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: 'Wasiyya — Islamic Estate Planning',
  description: 'Faraid-compliant, solicitor-reviewed Islamic wills for UK Muslim families. Guided, affordable, and built with scholars.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub

  let role: string | null = null
  let dashboard = '/portal'

  if (userId) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    role = (data as { role: string } | null)?.role ?? 'client'
    dashboard = ROLE_DASHBOARDS[role] ?? '/portal'
  }

  return (
    <html lang="en" className={cn(cormorant.variable, "font-sans", geist.variable)}>
      <body>
        <GlobalProvider>
          <ScrollToTop />
          <Nav initialLoggedIn={!!userId} initialRole={role} initialDashboard={dashboard} />
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
