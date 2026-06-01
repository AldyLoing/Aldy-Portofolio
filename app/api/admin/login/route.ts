import { NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '41dyl01ng'

export async function POST(request: Request) {
  const body = await request.json()
  const password = String(body.password || '')

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Password salah.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', 'unlocked', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  })

  return response
}