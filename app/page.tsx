import Link from 'next/link'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Projects from '../src/components/Projects'
import Certifications from '../src/components/Certifications'
import Skills from '../src/components/Skills'
import Experience from '../src/components/Experience'
import Contact from '../src/components/Contact'
import Capabilities from '../src/components/Capabilities'
import Impact from '../src/components/Impact'

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <Hero />
      <Capabilities />
      <Impact />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <footer className="mt-20 text-center text-sm text-slate-500">© Aldy</footer>
    </main>
  )
}
