import './globals.css'
import { ReactNode } from 'react'
import Header from '../src/components/Header'

export const metadata = {
  title: 'Aldy — Portfolio',
  description: 'Portfolio Aldy'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <div className="container mx-auto p-6">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
