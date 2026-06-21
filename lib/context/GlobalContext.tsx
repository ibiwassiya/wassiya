'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface GlobalState {
  user: User | null
  loading: boolean
}

const GlobalContext = createContext<GlobalState>({ user: null, loading: true })

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <GlobalContext.Provider value={{ user, loading }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  return useContext(GlobalContext)
}
