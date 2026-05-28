import site from '../../src/data/site.json'

export default function Contact() {
  const email = site.contact?.email || 'redacted@example.com'
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Kontak</h2>
      <div className="mt-4">
        <p>Email: <a className="text-primary" href={`mailto:${email}`}>{email}</a></p>
      </div>
    </section>
  )
}
