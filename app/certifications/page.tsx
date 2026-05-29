import { readCertificates } from '../../src/lib/content'
import Certifications from '../../src/components/Certifications'

export const metadata = {
  title: 'Certifications — Aldy'
}

export default async function CertificationsPage() {
  const certs = await readCertificates()

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Certifications</h1>
      <Certifications certs={certs} />
    </main>
  )
}
