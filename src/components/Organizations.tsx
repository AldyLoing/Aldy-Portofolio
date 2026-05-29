import site from '../../src/data/site.json'

export default function Organizations() {
  const organizations = site.organizations || []

  return (
    <section id="organizations" className="mt-12">
      <h2 className="text-2xl font-semibold">Organizational Experience</h2>
      <div className="mt-6 space-y-4">
        {organizations.map((item: any) => (
          <article key={`${item.role}-${item.organization}`} className="p-5 rounded-lg glass-card border border-white/6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                <p className="text-slate-300 text-sm">{item.organization}</p>
                <p className="mt-2 text-slate-300 text-sm">{item.summary}</p>
              </div>
              <div className="text-sm text-slate-400">{item.range}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
