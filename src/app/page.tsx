import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/landing/HeroSection"
import HowItWorks from "@/components/landing/HowItWorks"
import FeaturesGrid from "@/components/landing/FeaturesGrid"
import TemplateShowcase from "@/components/landing/TemplateShowcase"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <TemplateShowcase />
      <Footer />
    </main>
  )
}
