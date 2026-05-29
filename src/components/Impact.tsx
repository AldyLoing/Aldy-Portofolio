"use client"

import { motion } from 'framer-motion'

export default function Impact() {
  const cards = [
    { title: '50% CO₂ reduction', desc: 'Designed edge-enabled monitoring to reduce cloud compute and emissions for an energy project.', metric: '50% CO₂' },
    { title: 'Scalable inference', desc: 'Deployed model-serving platform handling 10k+ requests/min with autoscaling and cost controls.', metric: '10k+/min' },
    { title: 'Product-led growth', desc: 'Led product roadmap for analytics platform, improving activation by 3x within 6 months.', metric: '3x activation' }
  ]

  return (
    <section id="impact" className="mt-12 container mx-auto">
      <div className="mb-6">
        <h3 className="text-sm uppercase text-slate-400 tracking-wider">Selected Impact</h3>
        <h2 className="text-2xl md:text-3xl font-bold">Outcomes & impact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.article key={c.title} className="p-6 rounded-lg glass-card border border-white/6"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="text-sm text-accent-cyan font-bold">{c.metric}</div>
            <h3 className="mt-2 font-semibold text-white">{c.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{c.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
