'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { CertificateItem, SiteContent } from '../../src/lib/content'

type UpdateItem = {
  id: string
  title: string
  summary: string
  category: string
  date: string
  link?: string
}

const initialForm = {
  title: '',
  summary: '',
  category: 'Update',
  date: new Date().toISOString().slice(0, 10),
  link: ''
}

const emptyProject = {
  title: '',
  range: '',
  description: '',
  summary: '',
  stack: [] as string[],
  live: '',
  github: ''
}

const emptyExperience = {
  title: '',
  company: '',
  range: '',
  summary: ''
}

const emptyCertificate = {
  file: '',
  title: '',
  issuer: ''
}

const emptySite: SiteContent = {
  name: '',
  title: '',
  summary: '',
  contact: {
    email: '',
    whatsapp: '',
    linkedin: '',
    github: '',
    location: ''
  },
  education: [],
  achievements: [],
  projects: [],
  experience: [],
  organizations: [],
  skills: { categories: [] }
}

export default function AdminPage() {
  const [site, setSite] = useState<SiteContent>(emptySite)
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [updates, setUpdates] = useState<UpdateItem[]>([])
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  function authHeaders(): Record<string, string> {
    if (!adminPass) {
      return {}
    }

    return { 'x-admin-password': adminPass }
  }

  async function loadUpdates() {
    const response = await fetch('/api/updates', { cache: 'no-store' })
    setUpdates(await response.json())
  }

  async function loadContent() {
    const response = await fetch('/api/content', { cache: 'no-store' })
    const data = await response.json()
    setSite(data.site)
    setCertificates(data.certificates)
  }

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store' })
        const data = await response.json()
        setAuthenticated(Boolean(data.authenticated))
        if (data.authenticated) {
          await loadContent()
          await loadUpdates()
        }
      } catch {
        setMessage('Gagal memeriksa sesi admin.')
      } finally {
        setCheckingSession(false)
      }
    }

    loadSession()
  }, [])

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login gagal')
      }

      setAuthenticated(true)
  setAdminPass(password)
      setPassword('')
      await loadContent()
      await loadUpdates()
      setMessage('Login berhasil.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login gagal.')
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthenticated(false)
    setAdminPass('')
    setSite(emptySite)
    setCertificates([])
    setUpdates([])
    setMessage('Sudah keluar dari admin.')
  }

  function updateSite<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setSite((current) => ({ ...current, [key]: value }))
  }

  function updateContact(key: keyof SiteContent['contact'], value: string) {
    setSite((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [key]: value
      }
    }))
  }

  function updateProject(index: number, key: keyof SiteContent['projects'][number], value: string | string[]) {
    setSite((current) => ({
      ...current,
      projects: current.projects.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [key]: value } : project
      )
    }))
  }

  function addProject() {
    setSite((current) => ({ ...current, projects: [...current.projects, emptyProject] }))
  }

  function removeProject(index: number) {
    setSite((current) => ({ ...current, projects: current.projects.filter((_, projectIndex) => projectIndex !== index) }))
  }

  function updateExperience(index: number, key: keyof SiteContent['experience'][number], value: string) {
    setSite((current) => ({
      ...current,
      experience: current.experience.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    }))
  }

  function addExperience() {
    setSite((current) => ({ ...current, experience: [...current.experience, emptyExperience] }))
  }

  function removeExperience(index: number) {
    setSite((current) => ({ ...current, experience: current.experience.filter((_, itemIndex) => itemIndex !== index) }))
  }

  function updateCertificate(index: number, key: keyof CertificateItem, value: string) {
    setCertificates((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)))
  }

  function addCertificate() {
    setCertificates((current) => [...current, emptyCertificate])
  }

  function removeCertificate(index: number) {
    setCertificates((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  async function handleSaveContent() {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ site, certificates })
      })

      if (!response.ok) {
        const error = await response.json()
        if (response.status === 401) {
          setAuthenticated(false)
          throw new Error('Sesi admin tidak valid. Silakan login ulang.')
        }
        throw new Error(error.error || 'Failed to save content')
      }

      setMessage('Perubahan konten berhasil disimpan.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal menyimpan konten.')
    } finally {
      setSaving(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const error = await response.json()
        if (response.status === 401) {
          setAuthenticated(false)
          throw new Error('Sesi admin tidak valid. Silakan login ulang.')
        }
        throw new Error(error.error || 'Failed to save update')
      }

      setForm(initialForm)
      await loadUpdates()
      setMessage('Update berhasil ditambahkan.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal menyimpan update.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/updates?id=${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    if (!response.ok) {
      if (response.status === 401) {
        setAuthenticated(false)
        setMessage('Sesi admin tidak valid. Silakan login ulang.')
        return
      }
      setMessage('Gagal menghapus update.')
      return
    }

    await loadUpdates()
    setMessage('Update berhasil dihapus.')
  }

  if (checkingSession) {
    return <main className="py-8 text-slate-300">Memeriksa sesi admin...</main>
  }

  return (
    <main className="py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Admin Panel</p>
          <h1 className="text-3xl font-semibold text-white">Update Admin</h1>
          <p className="mt-2 text-sm text-slate-300">Tambah, lihat, dan hapus update portfolio dari sini.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-accent-cyan hover:text-white">Kembali ke beranda</Link>
          {authenticated && (
            <button onClick={handleLogout} className="text-sm text-slate-300 hover:text-white">Logout</button>
          )}
        </div>
      </div>

      {!authenticated ? (
        <form onSubmit={handleLogin} className="mt-8 glass-card border border-white/6 p-6 max-w-md space-y-4">
          <div>
            <label className="text-sm text-slate-300" htmlFor="password">Password admin</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan"
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald px-5 py-3 text-sm font-medium text-black">
            Masuk ke admin
          </button>
          {message && <p className="text-sm text-slate-300">{message}</p>}
        </form>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleSaveContent} disabled={saving} className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald px-5 py-3 text-sm font-medium text-black disabled:opacity-60">
              {saving ? 'Menyimpan...' : 'Simpan perubahan'}
            </button>
            {message && <span className="text-sm text-slate-300">{message}</span>}
          </div>

          <section className="glass-card border border-white/6 p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Profile</h2>
              <p className="section-kicker mt-1">About & Hero</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300" htmlFor="name">Nama</label>
                <input id="name" value={site.name} onChange={(event) => updateSite('name', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
              </div>
              <div>
                <label className="text-sm text-slate-300" htmlFor="title">Title</label>
                <input id="title" value={site.title} onChange={(event) => updateSite('title', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300" htmlFor="summary">Summary</label>
              <textarea id="summary" value={site.summary} onChange={(event) => updateSite('summary', event.target.value)} className="mt-2 min-h-40 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
            </div>
          </section>

          <section className="glass-card border border-white/6 p-6 space-y-4">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="text-xl font-semibold text-white">Contact section</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {(['email', 'whatsapp', 'linkedin', 'github', 'location'] as const).map((key) => (
                <div key={key}>
                  <label className="text-sm text-slate-300" htmlFor={key}>{key}</label>
                  <input id={key} value={site.contact[key]} onChange={(event) => updateContact(key, event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card border border-white/6 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Selected Work</p>
                <h2 className="text-xl font-semibold text-white">Projects</h2>
              </div>
              <button type="button" onClick={addProject} className="text-sm text-accent-cyan hover:text-white">Tambah project</button>
            </div>
            <div className="space-y-4">
              {site.projects.map((project, index) => (
                <article key={`${project.title}-${index}`} className="rounded-2xl border border-white/10 p-4 space-y-4 bg-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-white">Project {index + 1}</h3>
                    <button type="button" onClick={() => removeProject(index)} className="text-sm text-red-300 hover:text-red-100">Hapus</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={project.title} onChange={(event) => updateProject(index, 'title', event.target.value)} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                    <input value={project.range} onChange={(event) => updateProject(index, 'range', event.target.value)} placeholder="Range" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  </div>
                  <textarea value={project.description} onChange={(event) => updateProject(index, 'description', event.target.value)} placeholder="Description" className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  <textarea value={project.summary} onChange={(event) => updateProject(index, 'summary', event.target.value)} placeholder="Summary" className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  <input value={(project.stack || []).join(', ')} onChange={(event) => updateProject(index, 'stack', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="Stack, separated, by, comma" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={project.live || ''} onChange={(event) => updateProject(index, 'live', event.target.value)} placeholder="Live URL" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                    <input value={project.github || ''} onChange={(event) => updateProject(index, 'github', event.target.value)} placeholder="GitHub URL" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-card border border-white/6 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Experience</p>
                <h2 className="text-xl font-semibold text-white">Experience timeline</h2>
              </div>
              <button type="button" onClick={addExperience} className="text-sm text-accent-cyan hover:text-white">Tambah pengalaman</button>
            </div>
            <div className="space-y-4">
              {site.experience.map((item, index) => (
                <article key={`${item.title}-${index}`} className="rounded-2xl border border-white/10 p-4 space-y-4 bg-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-white">Experience {index + 1}</h3>
                    <button type="button" onClick={() => removeExperience(index)} className="text-sm text-red-300 hover:text-red-100">Hapus</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={item.title} onChange={(event) => updateExperience(index, 'title', event.target.value)} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                    <input value={item.company} onChange={(event) => updateExperience(index, 'company', event.target.value)} placeholder="Company" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  </div>
                  <input value={item.range} onChange={(event) => updateExperience(index, 'range', event.target.value)} placeholder="Range" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  <textarea value={item.summary} onChange={(event) => updateExperience(index, 'summary', event.target.value)} placeholder="Summary" className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                </article>
              ))}
            </div>
          </section>

          <section className="glass-card border border-white/6 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Certifications</p>
                <h2 className="text-xl font-semibold text-white">Certification grid</h2>
              </div>
              <button type="button" onClick={addCertificate} className="text-sm text-accent-cyan hover:text-white">Tambah sertifikat</button>
            </div>
            <div className="space-y-4">
              {certificates.map((certificate, index) => (
                <article key={`${certificate.file}-${index}`} className="rounded-2xl border border-white/10 p-4 space-y-4 bg-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-white">Certificate {index + 1}</h3>
                    <button type="button" onClick={() => removeCertificate(index)} className="text-sm text-red-300 hover:text-red-100">Hapus</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <input value={certificate.title} onChange={(event) => updateCertificate(index, 'title', event.target.value)} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                    <input value={certificate.issuer} onChange={(event) => updateCertificate(index, 'issuer', event.target.value)} placeholder="Issuer" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                    <input value={certificate.file} onChange={(event) => updateCertificate(index, 'file', event.target.value)} placeholder="File name" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="glass-card border border-white/6 p-6 space-y-4">
              <div>
                <p className="section-kicker">Fresh Notes</p>
                <h2 className="text-xl font-semibold text-white">Updates</h2>
              </div>
              <div>
                <label className="text-sm text-slate-300" htmlFor="update-title">Judul</label>
                <input id="update-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" required />
              </div>
              <div>
                <label className="text-sm text-slate-300" htmlFor="update-summary">Ringkasan</label>
                <textarea id="update-summary" value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" required />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm text-slate-300" htmlFor="update-category">Kategori</label>
                  <input id="update-category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                </div>
                <div>
                  <label className="text-sm text-slate-300" htmlFor="update-date">Tanggal</label>
                  <input id="update-date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" />
                </div>
                <div>
                  <label className="text-sm text-slate-300" htmlFor="update-link">Tautan</label>
                  <input id="update-link" value={form.link} onChange={(event) => setForm({ ...form, link: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-accent-cyan" placeholder="https://..." />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button type="submit" disabled={saving} className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald px-5 py-3 text-sm font-medium text-black disabled:opacity-60">
                  {saving ? 'Menyimpan...' : 'Tambah update'}
                </button>
                {message && <span className="text-sm text-slate-300">{message}</span>}
              </div>
            </form>

            <div className="space-y-4">
              <div className="glass-card border border-white/6 p-4 text-sm text-slate-300">
                Semua data konten disimpan ke <span className="text-white">src/data/site.json</span> dan <span className="text-white">src/data/certificates.json</span>.
              </div>
              {updates.length === 0 && <div className="glass-card border border-white/6 p-4 text-slate-300">Belum ada update tersimpan.</div>}
              {updates.map((update) => (
                <article key={update.id} className="glass-card border border-white/6 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-400">{update.category} • {update.date}</div>
                      <h2 className="mt-1 font-semibold text-white">{update.title}</h2>
                    </div>
                    <button onClick={() => handleDelete(update.id)} className="text-xs text-red-300 hover:text-red-100">Hapus</button>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{update.summary}</p>
                  {update.link && <a href={update.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-accent-cyan hover:text-white">{update.link}</a>}
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}