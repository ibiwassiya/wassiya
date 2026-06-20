import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './AdminDashboard'

export type Profile = {
  id:              string
  full_name:       string | null
  email:           string | null
  phone:           string | null
  role:            string
  is_active:       boolean
  created_at:      string
  firm:            string | null
  sra_number:      string | null
  referral_code:   string | null
  commission_rate: number | null
}

interface Props {
  searchParams: Promise<{ tab?: string; error?: string; success?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
  const supabase = await createClient()

  // Verify the caller is an admin before rendering anything.
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: me } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (me?.role !== 'admin') redirect('/portal')

  // Fetch all profiles — allowed by the "admins can read all profiles" RLS policy.
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, role, is_active, created_at, firm, sra_number, referral_code, commission_rate')
    .order('created_at', { ascending: false })

  const { tab, error } = await searchParams

  return (
    <AdminDashboard
      profiles={(profiles ?? []) as Profile[]}
      currentUserId={user.id}
      defaultTab={(tab as 'users' | 'create') ?? 'users'}
      error={error}
    />
  )
}
