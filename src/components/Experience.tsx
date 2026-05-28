import site from '../../src/data/site.json'

export default function Experience() {
  const exp = site.experience || []
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Pengalaman</h2>
      <div className="mt-4 space-y-4">
        {exp.length === 0 && <div className="text-slate-500">Belum ada pengalaman yang diisi.</div>}
        {exp.map((e: any, i: number) => (
          <article key={i} className="p-4 border rounded">
            <div className="font-medium">{e.title} @ {e.company}</div>
            <div className="text-sm text-slate-600">{e.range}</div>
            <p className="mt-2 text-sm text-slate-700">{e.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
