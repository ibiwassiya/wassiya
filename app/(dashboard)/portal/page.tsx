import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PortalSidebar from './components/PortalSidebar'
import OverviewTab from './components/OverviewTab'
import DocumentsTab from './components/DocumentsTab'
import AssetRegisterTab from './components/AssetRegisterTab'
import MessagesTab from './components/MessagesTab'
import MyWillsTab from './components/MyWillsTab'
type Tab = 'overview' | 'mywills' | 'documents' | 'assetreg' | 'messages'

type Draft = {
  id: string
  answers: Record<string, unknown> | null
  updated_at: string
  expires_at: string
}
const TABS: Tab[] = ['overview', 'mywills', 'documents', 'assetreg', 'messages']

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function PortalPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub
  if (!userId) redirect('/login')

  const { tab } = await searchParams
  const activeTab = (TABS.includes(tab as Tab) ? tab : 'overview') as Tab

  const drafts: Draft[] = []
  if (activeTab === 'mywills') {
    const { data } = await supabase
      .from('questionnaire_drafts')
      .select('id, answers, updated_at, expires_at')
      .eq('customer_id', userId)
      .order('updated_at', { ascending: false })
    if (data) drafts.push(...(data as Draft[]))
  }

  return (
    <div className="pwrap">
      <PortalSidebar activeTab={activeTab} />
      <div className="pmain">
        {activeTab === 'overview'  && <OverviewTab />}
        {activeTab === 'mywills'   && <MyWillsTab drafts={drafts} />}
        {activeTab === 'documents' && <DocumentsTab />}
        {activeTab === 'assetreg'  && <AssetRegisterTab />}
        {activeTab === 'messages'  && <MessagesTab />}
      </div>
    </div>
  )
}
