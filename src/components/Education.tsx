import site from '../../src/data/site.json'

export default function Education() {
  const education = site.education || []

  return (
    <section id="education" className="mt-12">
      <h2 className="text-2xl font-semibold">Education</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((item: any) => (
          <article key={`${item.institution}-${item.period}`} className="p-5 rounded-lg glass-card border border-white/6">
            <div className="text-sm text-accent-cyan font-medium">{item.period}</div>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.institution}</h3>
            <p className="text-slate-300 text-sm mt-1">{item.major}</p>
            <p className="text-slate-400 text-sm mt-3">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
