import projects from '../../src/data/site.json'
import Image from 'next/image'

export default function Projects() {
  const list = projects.projects || []
  return (
    <section id="projects" className="mt-12">
      <h2 className="text-2xl font-semibold">Selected Work</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.length === 0 && <div className="text-slate-500">No projects yet.</div>}
        {list.map((p: any) => (
          <article key={p.title} className="group relative overflow-hidden rounded-lg">
            <div className="p-6 glass-card border border-white/6 h-full">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white">{p.title}</h3>
                  <div className="mt-2 text-sm text-slate-300">{p.description}</div>
                  <p className="mt-3 text-slate-200 text-sm"><strong>Problem:</strong> {p.problem}</p>
                  <p className="mt-2 text-slate-200 text-sm"><strong>Solution:</strong> {p.solution}</p>
                  <p className="mt-2 text-accent-emerald font-medium">Impact: {p.impact}</p>
                  <div className="mt-4 text-xs text-slate-400">Role: {p.role} • Stack: {p.stack?.join(', ')}</div>
                </div>
                <div className="w-36 h-24 rounded overflow-hidden hidden md:block">
                  {p.images && p.images[0] ? (
                    <Image src={p.images[0]} alt={p.title} width={160} height={110} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
