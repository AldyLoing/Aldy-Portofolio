import site from '../../src/data/site.json'

export default function Skills() {
  const s = site.skills
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Keahlian</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-medium">Frontend</h3>
          <ul className="text-sm text-slate-600">{s.frontend.map((x: string) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h3 className="font-medium">Backend</h3>
          <ul className="text-sm text-slate-600">{s.backend.map((x: string) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h3 className="font-medium">ML / Tools</h3>
          <ul className="text-sm text-slate-600">{s.ml.concat(s.tools).map((x: string) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
