import { notFound } from "next/navigation"
import { CaseStudyLayout } from "@/components/case-study-layout"
import projectsData from "@/data/projects.json"
import type { Metadata } from "next"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Case Study | Mohamed`,
    description: project.short,
    openGraph: {
      title: `${project.title} - Case Study`,
      description: project.short,
      images: [project.cover],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Case Study`,
      description: project.short,
      images: [project.cover],
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <CaseStudyLayout project={project} />
}
