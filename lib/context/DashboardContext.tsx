'use client'
import { createContext, useContext } from 'react'

export type DashboardProfile = {
  id:              string
  full_name:       string | null
  email:           string | null
  role:            string
  phone:           string | null
  firm:            string | null
  sra_number:      string | null
  referral_code:   string | null
  commission_rate: number | null
  is_active:       boolean
}

type DashboardContextValue = {
  user:    { id: string }
  profile: DashboardProfile
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used inside DashboardProvider')
  return ctx
}

export default function DashboardProvider({
  user,
  profile,
  children,
}: {
  user:     { id: string }
  profile:  DashboardProfile
  children: React.ReactNode
}) {
  return (
    <DashboardContext.Provider value={{ user, profile }}>
      {children}
    </DashboardContext.Provider>
  )
}
