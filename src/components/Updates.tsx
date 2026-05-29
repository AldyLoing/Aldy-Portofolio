'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type UpdateItem = {
  id: string
  title: string
  summary: string
  category: string
  date: string
  link?: string
}

export default function Updates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadUpdates() {
      try {
        const response = await fetch('/api/updates', { cache: 'no-store' })
        const data = await response.json()
        if (active) setUpdates(data)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUpdates()
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="updates" className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Fresh Notes</p>
          <h2 className="text-2xl font-semibold">Updates</h2>
        </div>
        <Link href="/admin" className="text-sm text-accent-cyan hover:text-white">Admin panel</Link>
      </div>

      <div className="mt-6 grid gap-4">
        {loading && <div className="text-slate-400">Loading updates...</div>}
        {!loading && updates.length === 0 && (
          <div className="glass-card p-5 text-slate-300 border border-white/6">
            Belum ada update. Tambahkan dari admin panel.
          </div>
        )}

        {updates.map((update) => (
          <article key={update.id} className="glass-card p-5 border border-white/6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 px-2 py-1 text-white/80">{update.category}</span>
              <span>{update.date}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{update.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{update.summary}</p>
            {update.link && (
              <a href={update.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm text-accent-cyan hover:text-white">
                Buka tautan
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}