import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from './LoginForm'

interface Props {
  searchParams: Promise<{ error?: string }>
}

const ROLE_DASHBOARDS: Record<string, string> = {
  client:    '/portal',
  advisor:   '/advisor',
  solicitor: '/solicitor',
  scholar:   '/scholar',
  admin:     '/admin',
}

export default async function LoginPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub

  if (userId) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    redirect(ROLE_DASHBOARDS[profile?.role ?? 'client'] ?? '/portal')
  }

  const { error } = await searchParams
  return <LoginForm error={error} />
}
