import { readCertificates, readSiteContent } from '../src/lib/content'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Education from '../src/components/Education'
import Achievements from '../src/components/Achievements'
import Projects from '../src/components/Projects'
import Certifications from '../src/components/Certifications'
import Skills from '../src/components/Skills'
import Experience from '../src/components/Experience'
import Organizations from '../src/components/Organizations'
import Contact from '../src/components/Contact'
import Capabilities from '../src/components/Capabilities'
import Impact from '../src/components/Impact'
import Updates from '../src/components/Updates'

export default async function Home() {
  const [site, certs] = await Promise.all([readSiteContent(), readCertificates()])

  return (
    <main className="container mx-auto p-6">
      <Hero name={site.name} title={site.title} summary={site.summary} />
      <Capabilities />
      <Impact />
      <About summary={site.summary} />
      <Education />
      <Achievements />
      <Skills />
      <Projects projects={site.projects} />
      <Experience experience={site.experience} />
      <Organizations />
      <Certifications certs={certs} />
      <Updates />
      <Contact contact={site.contact} />
      <footer className="mt-20 text-center text-sm text-slate-500">© Aldy Oscar Pancasila Loing</footer>
    </main>
  )
}
