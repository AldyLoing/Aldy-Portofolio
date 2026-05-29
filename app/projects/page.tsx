import { readSiteContent } from '../../src/lib/content'
import Projects from '../../src/components/Projects'

export const metadata = {
  title: 'Projects — Aldy'
}

export default async function ProjectsPage() {
  const site = await readSiteContent()

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <Projects projects={site.projects} />
    </main>
  )
}
