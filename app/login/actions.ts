'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_COOKIE = 'gdy_auth'
const DEFAULT_PASSWORD = '1234'
const MAX_AGE = 60 * 60 * 24

function safeNext(input: string) {
  if (input.startsWith('/') && !input.startsWith('//')) {
    return input
  }
  return '/'
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') || '')
  const next = safeNext(String(formData.get('next') || ''))
  const expected = process.env.LOGIN_PASSWORD || DEFAULT_PASSWORD

  if (password !== expected) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`)
  }

  cookies().set(AUTH_COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })

  redirect(next)
}
