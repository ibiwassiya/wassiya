'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('fullName') as string,
        role: 'client',
      },
    },
  })

  if (error) redirect('/signup?error=signup_failed')

  revalidatePath('/', 'layout')
  redirect('/start')
}

export async function signUpAdvisor(formData: FormData) {
  const supabase = await createClient()

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`.trim(),
        role: 'advisor',
        phone: formData.get('phone') as string,
        firm: formData.get('firm') as string,
        regulated: formData.get('regulated') as string,
        source: formData.get('source') as string,
      },
    },
  })

  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/advisor')
}

