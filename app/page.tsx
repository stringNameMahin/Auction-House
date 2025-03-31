import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import InfoSection from "@/components/info-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <InfoSection />
      <Footer />
    </main>
  )
}

