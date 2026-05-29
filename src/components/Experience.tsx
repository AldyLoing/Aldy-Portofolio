type ExperienceItem = {
  title: string
  company: string
  range: string
  summary: string
}

type ExperienceProps = {
  experience: ExperienceItem[]
}

export default function Experience({ experience }: ExperienceProps) {
  const exp = experience || []
  return (
    <section id="experience" className="mt-12">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-6 border-l border-white/6 pl-6 space-y-8">
        {exp.length === 0 && <div className="text-slate-500">No experience listed yet.</div>}
        {exp.map((e: any, i: number) => (
          <div key={i} className="relative">
            <div className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-white/10 border border-white/6" />
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
