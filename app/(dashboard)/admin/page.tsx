import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from './components/AdminSidebar'
import UsersTab from './components/UsersTab'
import CreateUserForm from './components/CreateUserForm'

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
  searchParams: Promise<{ tab?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
  const supabase = await createClient()

  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (!userId) redirect('/login')

  const { data: me } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (me?.role !== 'admin') redirect('/portal')

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, role, is_active, created_at, firm, sra_number, referral_code, commission_rate')
    .order('created_at', { ascending: false })

  const { tab } = await searchParams
  const activeTab = (tab === 'create' ? 'create' : 'users') as 'users' | 'create'

  return (
    <div className="pwrap">
      <AdminSidebar activeTab={activeTab} profiles={(profiles ?? []) as Profile[]} />
      <div className="pmain">
        {activeTab === 'users'  && <UsersTab profiles={(profiles ?? []) as Profile[]} currentUserId={userId} />}
        {activeTab === 'create' && <CreateUserForm />}
      </div>
    </div>
  )
}
