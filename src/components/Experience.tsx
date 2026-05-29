import site from '../../src/data/site.json'

export default function Experience() {
  const exp = site.experience || []
  return (
    <section id="experience" className="mt-12">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-6 border-l border-white/6 pl-6 space-y-8">
        {exp.length === 0 && <div className="text-slate-500">No experience listed yet.</div>}
        {exp.map((e: any, i: number) => (
          <div key={i} className="relative">
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-accent-cyan border-2 border-white/6" />
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-semibold text-white">{e.title}</div>
                  <div className="text-sm text-slate-300">{e.company}</div>
                </div>
                <div className="text-xs text-slate-400">{e.range}</div>
              </div>
              <p className="mt-2 text-slate-300 text-sm">{e.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
