import site from '../../src/data/site.json'

export default function Skills() {
  const categories = site.skills?.categories || []

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Technical Skills</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((category: any) => (
          <article key={category.label} className="p-5 rounded-lg glass-card border border-white/6">
            <h3 className="font-medium text-white">{category.label}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item: string) => (
                <span key={item} className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-200 border border-white/6">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
