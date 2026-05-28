import certs from '../../src/data/certificates.json'

export default function Certifications() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Sertifikat</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {certs.length === 0 && <div className="text-slate-500">Sertifikat belum tersedia.</div>}
        {certs.map((c: any) => (
          <a key={c.file} href={`/certificates/Certificate/${encodeURIComponent(c.file)}`} target="_blank" rel="noreferrer" className="block p-2 border rounded text-sm">
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-slate-500">{c.issuer}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
