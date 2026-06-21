import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ROUTE_ROLES: Record<string, string[]> = {
  '/portal':    ['client',    'admin'],
  '/start':     ['client',    'admin'],
  '/advisor':   ['advisor',   'admin'],
  '/solicitor': ['solicitor', 'admin'],
  '/scholar':   ['scholar',   'admin'],
  '/admin':     ['admin'],
}

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
        setAll(cookiesToSet, cacheHeaders) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          // Prevent CDNs from caching responses that contain session tokens
          if (cacheHeaders) {
            Object.entries(cacheHeaders).forEach(([key, value]) =>
              supabaseResponse.headers.set(key, value)
            )
          }
        },
      },
    }
  )

  // getClaims() verifies the JWT locally via WebCrypto — no network call.
  // Works in Edge Runtime unlike getUser() which makes a live API call.
  const { data: claims } = await supabase.auth.getClaims()
  const userId = claims?.claims?.sub

  const path = request.nextUrl.pathname
  const matchedRoute = PROTECTED.find(r => path.startsWith(r))

  if (!matchedRoute) return supabaseResponse

  if (!userId) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', path)
    return NextResponse.redirect(loginUrl)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  const role = profile?.role ?? 'client'
  const allowed = ROUTE_ROLES[matchedRoute]

  if (!allowed.includes(role)) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = ROLE_DASHBOARDS[role] ?? '/portal'
    dashboardUrl.search = ''
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}
