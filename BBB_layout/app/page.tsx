"use client"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Sponsors from "@/components/sponsors"
import TicketPricing from "@/components/ticket-pricing"
import ParticipantsCounter from "@/components/participants-counter"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <About />
      <Sponsors />
      <TicketPricing />
      <ParticipantsCounter />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  )
}
