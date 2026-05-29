"use client"

import { motion } from 'framer-motion'

export default function Capabilities() {
  const items = [
    { title: 'AI & ML Systems', desc: 'Production ML pipelines, model ops, and inference at scale', chips: ['TensorFlow', 'PyTorch', 'MLflow'] },
    { title: 'Cloud Architecture', desc: 'Design and run resilient cloud-native systems', chips: ['GCP', 'AWS', 'Kubernetes'] },
    { title: 'Sustainability Engineering', desc: 'Circular tech, energy-aware designs, lifecycle analysis', chips: ['LCA', 'IoT', 'Edge'] },
    { title: 'Product + Strategy', desc: 'Roadmaps, product-market fit, and technical leadership', chips: ['OKR', 'Roadmaps', 'Stakeholder'] },
    { title: 'Data & Analytics', desc: 'Streaming analytics, event-driven design, and observability', chips: ['Kafka', 'BigQuery', 'Grafana'] },
    { title: 'DevOps & Security', desc: 'CI/CD, infra-as-code, secure delivery pipelines', chips: ['Terraform', 'Docker', 'CI'] }
  ]

  return (
    <section id="capabilities" className="mt-12 container mx-auto">
      <div className="mb-8">
        <h3 className="text-sm uppercase text-slate-400 tracking-wider">Capabilities</h3>
        <h2 className="text-2xl md:text-3xl font-bold">What I build</h2>
        <p className="text-slate-300 max-w-2xl mt-2">Technical leadership and hands-on execution across AI, cloud systems, and sustainable product delivery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <motion.div key={it.title} className="p-5 rounded-lg glass-card border border-white/6"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.06 }}
          >
            <h4 className="font-semibold text-lg text-white">{it.title}</h4>
            <p className="text-slate-300 mt-2 text-sm">{it.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {it.chips.map(c => (
                <span key={c} className="text-xs bg-white/4 px-2 py-1 rounded text-slate-200">{c}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
