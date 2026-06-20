'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export type CreateUserState = {
  status:   'idle'
} | {
  status:   'success'
  fullName: string
  email:    string
  password: string
  role:     string
} | {
  status:   'error'
  message:  string
}

// Creates a solicitor or scholar account.
// Returns state instead of redirecting so the client can show
// a credential dialog for the admin to copy before closing.
export async function createUser(
  _prev: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const supabase  = createAdminClient()

  const role      = formData.get('role')      as string
  const fullName  = formData.get('fullName')  as string
  const email     = formData.get('email')     as string
  const password  = formData.get('password')  as string
  const phone     = (formData.get('phone')     as string) || null
  const sraNumber = (formData.get('sraNumber') as string) || null

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name:  fullName,
      role,
      phone,
      sra_number: sraNumber,
    },
  })

  if (error) return { status: 'error', message: error.message }

  revalidatePath('/admin')
  return { status: 'success', fullName, email, password, role }
}

// Toggles is_active on a profile row.
// Uses service role so it bypasses RLS.
export async function toggleUserActive(userId: string, currentlyActive: boolean) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('profiles')
    .update({ is_active: !currentlyActive })
    .eq('id', userId)

  if (error) throw new Error(error.message)

  revalidatePath('/admin')
}
