import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { readJsonResource, writeJsonResource } from '../../../src/lib/storage'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '41dyl01ng'

type UpdateItem = {
  id: string
  title: string
  summary: string
  category: string
  date: string
  link?: string
  createdAt: string
}

const updatesFile = path.join(process.cwd(), 'src/data/updates.json')

async function readUpdates(): Promise<UpdateItem[]> {
  try {
    return await readJsonResource<UpdateItem[]>('src/data/updates.json', updatesFile)
  } catch {
    return []
  }
}

async function writeUpdates(updates: UpdateItem[]) {
  await writeJsonResource('src/data/updates.json', updatesFile, updates)
}

function isAuthenticated(request: NextRequest) {
  if (request.cookies.get('admin_session')?.value === 'unlocked') {
    return true
  }

  const headerPassword = request.headers.get('x-admin-password') || ''
  return headerPassword === ADMIN_PASSWORD
}

export async function GET() {
  const updates = await readUpdates()
  return NextResponse.json(updates.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const body = await request.json()
  const title = String(body.title || '').trim()
  const summary = String(body.summary || '').trim()
  const category = String(body.category || 'Update').trim()
  const date = String(body.date || new Date().toISOString().slice(0, 10))
  const link = String(body.link || '').trim()

  if (!title || !summary) {
    return NextResponse.json({ error: 'Title and summary are required.' }, { status: 400 })
  }

  const updates = await readUpdates()
  const nextItem: UpdateItem = {
    id: randomUUID(),
    title,
    summary,
    category,
    date,
    link: link || undefined,
    createdAt: new Date().toISOString()
  }

  updates.unshift(nextItem)
  await writeUpdates(updates)

  return NextResponse.json(nextItem, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing update id.' }, { status: 400 })
  }

  const updates = await readUpdates()
  const filtered = updates.filter((item) => item.id !== id)

  if (filtered.length === updates.length) {
    return NextResponse.json({ error: 'Update not found.' }, { status: 404 })
  }

  await writeUpdates(filtered)
  return NextResponse.json({ ok: true })
}