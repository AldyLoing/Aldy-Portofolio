"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  return (
    <header className="sticky top-5 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between p-3 glass-card rounded-full shadow-sm border border-white/6">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-lg font-semibold tracking-tight">Aldy Oscar</Link>
            <span className="hidden md:inline text-sm text-muted">Founder • Cloud & Sustainability</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-slate-300 hover:text-white">About</a>
            <a href="#projects" className="text-sm text-slate-300 hover:text-white">Selected Work</a>
            <a href="#experience" className="text-sm text-slate-300 hover:text-white">Experience</a>
            <a href="#certifications" className="text-sm text-slate-300 hover:text-white">Certifications</a>
            <a href="#contact" className="text-sm text-slate-300 hover:text-white">Contact</a>
            <a href="/cv.pdf" target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald text-black font-medium">Resume</a>
          </div>

          <div className="flex items-center gap-3 md:gap-0">
            <button aria-pressed={dark} onClick={() => setDark(!dark)} className="w-10 h-10 rounded-full flex items-center justify-center border border-white/6 bg-transparent">
              {dark ? (
                <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 3v1m0 16v1m8.66-10h-1M3.34 12h-1M18.36 5.64l-.7.7M6.34 18.66l-.7.7M18.36 18.36l-.7-.7M6.34 5.64l-.7-.7"/></svg>
              ) : (
                <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
