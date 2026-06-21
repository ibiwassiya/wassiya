import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardProvider, { type DashboardProfile } from '@/lib/context/DashboardContext'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub
  if (!userId) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, phone, firm, sra_number, referral_code, commission_rate, is_active')
    .eq('id', userId)
    .single()

  if (!profile) redirect('/login')

  return (
    <DashboardProvider user={{ id: userId }} profile={profile as DashboardProfile}>
      {children}
    </DashboardProvider>
  )
}
