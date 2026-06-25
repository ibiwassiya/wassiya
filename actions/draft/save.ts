'use server'
import { createClient } from '@/lib/supabase/server'
import type { Json } from '@/lib/types/database'

export type DraftPayload = {
  form:        Record<string, unknown>
  opts:        Record<string, number>
  multi:       Record<string, number[]>
  religious:   number[]
  childrenHas: boolean | null
  step:        number
}

export async function saveDraft(payload: DraftPayload): Promise<{ id?: string; error?: string }> {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub

  if (!userId) return { error: 'Please sign in to save your progress' }

  const answers = payload as unknown as Json

  const { data: existing } = await supabase
    .from('questionnaire_drafts')
    .select('id')
    .eq('customer_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('questionnaire_drafts')
      .update({ answers })
      .eq('id', existing.id)
    if (error) return { error: error.message }
    return { id: existing.id }
  } else {
    const { data: created, error } = await supabase
      .from('questionnaire_drafts')
      .insert({ customer_id: userId, answers })
      .select('id')
      .single()
    if (error) return { error: error.message }
    return { id: created.id }
  }
}
