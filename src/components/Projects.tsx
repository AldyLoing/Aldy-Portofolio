import projects from '../../src/data/site.json'

export default function Projects() {
  const list = projects.projects || []
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Proyek</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.length === 0 && <div className="text-slate-500">Belum ada proyek — gunakan CV untuk mengisi data.</div>}
        {list.map((p: any) => (
          <article key={p.title} className="p-4 border rounded">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-slate-600">{p.description}</p>
            <div className="mt-2 text-xs text-slate-500">{p.stack?.join(', ')}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
