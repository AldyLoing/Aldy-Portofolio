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
      <body>
        <a href="#main" className="skip-link sr-only focus:not-sr-only">Skip to content</a>
        <div className="container mx-auto p-6">
          <Header />
          <main id="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
