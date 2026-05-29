"use client"

import { useState } from 'react'
import site from '../../src/data/site.json'

export default function Contact() {
  const email = site.contact?.email || 'redacted@example.com'
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  async function handleSubmit(e: any) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.target)
    const body = Object.fromEntries(fd as any)
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mt-12">
      <h2 className="text-2xl font-semibold">Let’s build systems that create impact.</h2>
      <p className="text-slate-300 mt-2">Contact for advisory, collaboration, or opportunities.</p>

      <div className="mt-6 max-w-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          <input name="name" placeholder="Your name" required className="px-4 py-3 rounded bg-white/3 border border-white/6" />
          <input name="email" type="email" placeholder="Your email" required className="px-4 py-3 rounded bg-white/3 border border-white/6" />
          <textarea name="message" rows={5} placeholder="Brief message" required className="px-4 py-3 rounded bg-white/3 border border-white/6" />
          <div className="flex items-center gap-3">
            <button type="submit" disabled={status==='sending'} className="px-5 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald text-black font-semibold">Send</button>
            <div className="text-sm text-slate-400">or email <a className="text-accent-cyan underline" href={`mailto:${email}`}>{email}</a></div>
          </div>
          {status === 'sent' && <div className="text-sm text-emerald-400">Message sent — thank you.</div>}
          {status === 'error' && <div className="text-sm text-rose-400">Failed to send message.</div>}
        </form>
      </div>
    </section>
  )
}
