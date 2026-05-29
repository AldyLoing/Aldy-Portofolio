type CertificateItem = {
  file: string
  title: string
  issuer: string
}

type CertificationsProps = {
  certs: CertificateItem[]
}

export default function Certifications({ certs }: CertificationsProps) {
  return (
    <section id="certifications" className="mt-12">
      <h2 className="text-2xl font-semibold">Certifications</h2>
      <p className="text-slate-300 mt-2">Selected certificates and recognitions.</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {certs.length === 0 && <div className="text-slate-500">No certificates available.</div>}
        {certs.map((c: any) => (
          <a key={c.file} href={`/certificates/Certificate/${encodeURIComponent(c.file)}`} target="_blank" rel="noreferrer" className="block p-4 glass-card rounded-lg border border-white/6 hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-white/5 rounded overflow-hidden flex-shrink-0">
                {/* thumbnail placeholder */}
              </div>
              <div>
                <div className="font-medium text-white text-sm">{c.title}</div>
                <div className="text-xs text-slate-400">{c.issuer}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
