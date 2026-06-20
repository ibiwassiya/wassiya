import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Which roles are allowed on each protected route prefix.
// Admin can access every route.
const ROUTE_ROLES: Record<string, string[]> = {
  '/portal':         ['client',    'admin'],
  '/start':          ['client',    'admin'],
  '/advisor':        ['advisor',   'admin'],
  '/solicitor':      ['solicitor', 'admin'],
  '/scholar':        ['scholar',   'admin'],
  '/admin':          ['admin'],
}

// Where to send each role after a successful sign-in (or wrong-route redirect).
const ROLE_DASHBOARDS: Record<string, string> = {
  client:    '/portal',
  advisor:   '/advisor',
  solicitor: '/solicitor',
  scholar:   '/scholar',
  admin:     '/admin',
}

const PROTECTED = Object.keys(ROUTE_ROLES)

export async function updateSession(request: NextRequest) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() makes a server round-trip — cannot be spoofed unlike getSession().
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const matchedRoute = PROTECTED.find(r => path.startsWith(r))

  // Not a protected route — pass through.
  if (!matchedRoute) return supabaseResponse

  // Protected route, no session — redirect to login preserving intended path.
  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', path)
    return NextResponse.redirect(loginUrl)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? 'client'
  const allowed = ROUTE_ROLES[matchedRoute]

  // Role not permitted for this route — redirect to their own dashboard.
  if (!allowed.includes(role)) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = ROLE_DASHBOARDS[role] ?? '/portal'
    dashboardUrl.search = ''
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}
