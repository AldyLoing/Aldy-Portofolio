"use client"

import { useEffect, useState } from 'react'

export default function Header() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])
  return (
    <header className="py-4 flex items-center justify-between">
      <div className="text-lg font-semibold">Aldy</div>
      <div>
        <button aria-pressed={dark} onClick={() => setDark(!dark)} className="px-3 py-1 border rounded">
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
