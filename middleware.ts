import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE = 'gdy_auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLogin = pathname === '/login'
  const isAuthed = req.cookies.get(AUTH_COOKIE)?.value === '1'

  if (!isAuthed && !isLogin) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith('/s/')) {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const id = pathname.split('/').pop()
      const url = await kv.get(`fragment:${id}`)
      return url
        ? NextResponse.redirect(url as string)
        : NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|__nextjs|favicon.ico|robots.txt|gdy/|thirdparty/|apple-touch-icon.png|apple-touch-icon-precomposed.png).*)',
  ],
}
