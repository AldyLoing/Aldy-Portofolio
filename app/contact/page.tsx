import { readSiteContent } from '../../src/lib/content'
import Contact from '../../src/components/Contact'

export const metadata = {
  title: 'Contact — Aldy'
}

export default async function ContactPage() {
  const site = await readSiteContent()

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <Contact contact={site.contact} />
    </main>
  )
}
