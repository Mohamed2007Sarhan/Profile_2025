import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { Certifications } from "@/components/certifications"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Achievements } from "@/components/achievements"
import { Pricing } from "@/components/pricing"
import { Feedback } from "@/components/feedback"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingParticles, FloatingElements } from "@/components/floating-particles"
import { Floating3DShapes } from "@/components/3d-effects"
import { SiteSettingsProvider } from "@/components/site-settings-provider"
import { LoadingAnimation } from "@/components/loading-animation"

export default function HomePage() {
  return (
    <SiteSettingsProvider>
      <LoadingAnimation />
      <main className="min-h-screen relative">
        <FloatingParticles />
        <FloatingElements />
        <Floating3DShapes />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Certifications />
        <TestimonialsSection />
        <Achievements />
        <Pricing />
        <Feedback />
        <Contact />
        <Footer />
      </main>
    </SiteSettingsProvider>
  )
}
