import site from '../../src/data/site.json'

export default function About() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Tentang</h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">{site.summary}</p>
    </section>
  )
}
