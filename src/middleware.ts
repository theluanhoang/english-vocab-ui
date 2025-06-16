import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  })

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register')

  // Check if this is a redirect from session expired
  const isSessionExpired = request.nextUrl.searchParams.get('from') === 'session-expired'

  if (!token && !isAuthPage) {
    const url = new URL("/login", request.url)
    // Only add callbackUrl if not redirecting from session expired
    if (!isSessionExpired) {
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    }
    return NextResponse.redirect(url)
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/collections", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 