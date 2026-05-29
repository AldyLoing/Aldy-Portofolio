import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const authenticated = cookie.includes('admin_session=unlocked')
  return NextResponse.json({ authenticated })
}