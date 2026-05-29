type AboutProps = {
  summary: string
}

export default function About({ summary }: AboutProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold">Tentang</h2>
      <p className="mt-3 text-slate-700 dark:text-slate-300">{summary}</p>
    </section>
  )
}
