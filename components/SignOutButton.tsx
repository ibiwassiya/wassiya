'use client'

import { LogOut } from 'lucide-react'

interface Props {
  style?: React.CSSProperties
}

export default function SignOutButton({ style }: Props) {
  return (
    <a href="/api/auth/signout" style={{ textDecoration: 'none', ...style }}>
      <LogOut size={14} />
      Sign out
    </a>
  )
}
