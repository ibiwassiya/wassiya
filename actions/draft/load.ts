'use server'
import { createClient } from '@/lib/supabase/server'

export async function loadDraft(id: string) {
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (!userId) return null

  const { data } = await supabase
    .from('questionnaire_drafts')
    .select('answers')
    .eq('id', id)
    .eq('customer_id', userId)
    .single()

  return data?.answers ?? null
}
