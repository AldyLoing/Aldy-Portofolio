"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="mt-0 -mx-6 px-6 py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left content */}
        <motion.div
          className="flex-1 text-white"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Terbuka untuk peluang baru
            </div>
            <div className="inline-flex px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 text-xs font-medium">
              Cloud & ML Enthusiast
            </div>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-slate-400 text-sm font-medium mb-2">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
                Aldy Oscar
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Pancasila Loing
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-slate-300 mb-8 max-w-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Software Engineer
          </motion.p>

          {/* Specialization box */}
          <motion.div
            className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Spesialisasi dalam</p>
            <p className="text-slate-200 font-medium">Cloud Development & AI Solutions</p>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Unduh CV
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Right side - Profile image */}
        <motion.div
          className="flex-1 relative w-full h-[480px] md:h-[700px] flex items-center justify-center pt-6 md:pt-12"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-visible flex items-center justify-center max-h-[90vh]">
            {/* Image container with glow effect */}
            <div className="relative w-full h-full overflow-visible flex items-center justify-center">
              {/* subtle vignette to blend the image with background */}
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
