import { NextRequest, NextResponse } from 'next/server'
import { readCertificates, readSiteContent, writeCertificates, writeSiteContent } from '../../../src/lib/content'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '41dyl01ng'

function isAuthenticated(request: NextRequest) {
  if (request.cookies.get('admin_session')?.value === 'unlocked') {
    return true
  }

  const headerPassword = request.headers.get('x-admin-password') || ''
  return headerPassword === ADMIN_PASSWORD
}

export async function GET() {
  const [site, certificates] = await Promise.all([readSiteContent(), readCertificates()])
  return NextResponse.json({ site, certificates })
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const body = await request.json()
  const site = body.site
  const certificates = body.certificates

  if (!site || !certificates) {
    return NextResponse.json({ error: 'Missing site or certificates payload.' }, { status: 400 })
  }

  await writeSiteContent(site)
  await writeCertificates(certificates)

  return NextResponse.json({ ok: true })
}