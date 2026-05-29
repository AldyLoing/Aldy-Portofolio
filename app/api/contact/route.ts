import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Minimal server-side validation
    if (!body?.email || !body?.message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    // In production, integrate with an email provider or webhook here.
    // For now, log to server console and return success.
    // eslint-disable-next-line no-console
    console.log('Contact form submission:', body)

    return NextResponse.json({ ok: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
