"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

export default function SponsorsManagement() {
  const [sponsors, setSponsors] = useState<any[]>([
    {
      id: 1,
      name: "Global Chess Federation",
      tier: "Platinum",
      logo: "🏅",
      website: "https://example.com",
    },
  ])

  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Sponsors Management</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-secondary text-primary-foreground"
        >
          <Plus size={18} className="mr-2" />
          Add Sponsor
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border border-border mb-8">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setShowForm(false)
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Sponsor Name"
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              />
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary">
                <option>Platinum</option>
                <option>Gold</option>
                <option>Silver</option>
              </select>
            </div>
            <input
              type="url"
              placeholder="Website URL"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            />
            <textarea
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            />
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-secondary text-primary-foreground" type="submit">
                Save Sponsor
              </Button>
              <Button
                className="bg-muted text-foreground hover:bg-border"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="p-6 border border-border">
            <div className="text-4xl mb-4">{sponsor.logo}</div>
            <h3 className="text-lg font-bold text-foreground mb-2">{sponsor.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{sponsor.tier} Tier</p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-muted text-foreground hover:bg-border text-sm" size="sm">
                <Edit2 size={16} />
              </Button>
              <Button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-sm" size="sm">
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
