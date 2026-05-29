type ProjectItem = {
  title: string
  range: string
  description: string
  summary: string
  stack?: string[]
  live?: string
  github?: string
}

type ProjectsProps = {
  projects: ProjectItem[]
}

export default function Projects({ projects }: ProjectsProps) {
  const list = projects || []

  return (
    <section id="projects" className="mt-12">
      <h2 className="text-2xl font-semibold">Project Experiences</h2>
      <div className="mt-6 space-y-4">
        {list.length === 0 && <div className="text-slate-500">No projects yet.</div>}
        {list.map((p: any) => (
          <article key={p.title} className="p-5 rounded-lg glass-card border border-white/6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="max-w-3xl">
                <div className="text-sm text-accent-cyan font-medium">{p.range}</div>
                <h3 className="mt-1 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-slate-300 text-sm">{p.description}</p>
                <p className="mt-3 text-slate-200 text-sm">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack?.map((item: string) => (
                    <span key={item} className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-200 border border-white/6">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {p.live && (
                  <a className="text-accent-cyan underline" href={p.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
                {p.github && (
                  <a className="text-slate-200 underline" href={p.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
