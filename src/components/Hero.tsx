"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

type HeroProps = {
  name: string
  title: string
  summary: string
}

export default function Hero({ name, title, summary }: HeroProps) {
  return (
    <section className="mt-0 -mx-6 px-6 py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="flex-1 text-white"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/6 text-slate-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
              {title}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-slate-400 text-sm font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {name}
            </h1>
          </motion.div>

          <motion.p
            className="text-lg text-slate-300 mb-6 max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {summary}
          </motion.p>

          <motion.div
            className="p-4 rounded-lg glass-card mb-8 border border-white/6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Core Focus</p>
            <p className="text-slate-100 font-medium">AI applications • Sustainable systems • Web platforms • Community impact</p>
          </motion.div>

          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald text-black font-semibold hover:scale-[1.02] transition-all"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
            >
              View Selected Work
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/6 text-white font-medium hover:bg-white/5 transition-all"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Let’s collaborate
            </motion.a>
            <a href="/cv.pdf" className="text-sm text-slate-200 underline">Unduh CV</a>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 relative w-full h-[480px] md:h-[700px] flex items-center justify-center pt-6 md:pt-12"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-visible flex items-center justify-center max-h-[90vh]">
            <div className="relative w-full h-full overflow-visible flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-slate-900/30"></div>
              <Image
                src="/image/Aldy.png"
                alt="Aldy Oscar Pancasila Loing"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-top drop-shadow-[0_30px_60px_rgba(2,6,23,0.6)]"
                style={{ opacity: 0.98 }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
