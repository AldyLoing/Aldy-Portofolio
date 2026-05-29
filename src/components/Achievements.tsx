import site from '../../src/data/site.json'

export default function Achievements() {
  const achievements = site.achievements || []

  return (
    <section id="achievements" className="mt-12">
      <h2 className="text-2xl font-semibold">Achievements</h2>
      <div className="mt-6 space-y-4">
        {achievements.map((item: any) => (
          <article key={item.title} className="p-5 rounded-lg glass-card border border-white/6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-300 text-sm">{item.summary}</p>
              </div>
              <div className="text-sm text-accent-cyan font-medium">{item.year}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
