"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SponsorsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const sponsors = [
    {
      id: 1,
      name: "Global Chess Federation",
      tier: "Platinum",
      category: "Sports Association",
      logo: "🏅",
      website: "https://example.com",
      description: "Leading international chess organization promoting excellence worldwide.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 2,
      name: "Strategic Minds Inc",
      tier: "Platinum",
      category: "Corporate",
      logo: "💼",
      website: "https://example.com",
      description: "Innovation-driven company supporting competitive excellence.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 3,
      name: "TechChess Platform",
      tier: "Gold",
      category: "Technology",
      logo: "💻",
      website: "https://example.com",
      description: "Digital solutions for chess communities and tournaments.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 4,
      name: "Elite Sports Ventures",
      tier: "Gold",
      category: "Sports",
      logo: "🎯",
      website: "https://example.com",
      description: "Premium sports event management and sponsorship services.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 5,
      name: "Community Chess Club",
      tier: "Silver",
      category: "Community",
      logo: "♔",
      website: "https://example.com",
      description: "Local community supporting grassroots chess development.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 6,
      name: "Innovation Labs",
      tier: "Silver",
      category: "Education",
      logo: "🔬",
      website: "https://example.com",
      description: "Educational institution promoting chess in schools.",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
  ]

  const filteredSponsors = selectedTier ? sponsors.filter((s) => s.tier === selectedTier) : sponsors

  return (
    <main className="bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">Our Sponsors</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the organizations supporting our mission to bring chess excellence to the world.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 md:px-6 bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-muted-foreground mb-4">FILTER BY TIER:</p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setSelectedTier(null)}
              variant={selectedTier === null ? "default" : "outline"}
              className={selectedTier === null ? "bg-primary hover:bg-secondary text-primary-foreground" : ""}
            >
              All Sponsors
            </Button>
            {["Platinum", "Gold", "Silver"].map((tier) => (
              <Button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                variant={selectedTier === tier ? "default" : "outline"}
                className={selectedTier === tier ? "bg-primary hover:bg-secondary text-primary-foreground" : ""}
              >
                {tier}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-20 px-4 md:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary"
              >
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-24 flex items-center justify-center text-5xl">
                  {sponsor.logo}
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold text-primary mb-2">{sponsor.tier.toUpperCase()}</p>
                  <h3 className="text-xl font-bold text-foreground mb-1">{sponsor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{sponsor.category}</p>
                  <p className="text-sm text-foreground mb-6 leading-relaxed">{sponsor.description}</p>

                  <div className="flex gap-2 mb-4">
                    <a
                      href={sponsor.social.linkedin}
                      className="text-primary hover:text-secondary text-sm font-semibold"
                    >
                      LinkedIn
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href={sponsor.social.twitter}
                      className="text-primary hover:text-secondary text-sm font-semibold"
                    >
                      Twitter
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href={sponsor.social.website}
                      className="text-primary hover:text-secondary text-sm font-semibold"
                    >
                      Website
                    </a>
                  </div>

                  <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">View Details</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Become Sponsor CTA */}
          <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 rounded-lg border border-primary/20 p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Interested in Sponsoring?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our prestigious sponsors and be part of the premier chess event. We offer multiple sponsorship tiers
              with customized benefits.
            </p>
            <Button className="bg-primary hover:bg-secondary text-primary-foreground px-8 py-3">
              Contact Us for Sponsorship
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
