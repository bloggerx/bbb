"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Download, Mail } from "lucide-react"

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // TODO: Fetch from API
    const mockData = [
      {
        id: 1,
        registrationId: "CHESS-2025-ABC123",
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        ticket: "Platinum",
        status: "Confirmed",
        date: "2025-02-20",
      },
      {
        id: 2,
        registrationId: "CHESS-2025-DEF456",
        name: "Priya Singh",
        email: "priya@example.com",
        ticket: "Gold",
        status: "Confirmed",
        date: "2025-02-20",
      },
      {
        id: 3,
        registrationId: "CHESS-2025-GHI789",
        name: "Arun Patel",
        email: "arun@example.com",
        ticket: "Silver",
        status: "Pending",
        date: "2025-02-19",
      },
    ]
    setRegistrations(mockData)
    setFilteredRegistrations(mockData)
  }, [])

  useEffect(() => {
    let filtered = registrations

    if (searchTerm) {
      filtered = filtered.filter(
        (reg) =>
          reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.registrationId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((reg) => reg.ticket === filterType)
    }

    setFilteredRegistrations(filtered)
  }, [searchTerm, filterType, registrations])

  const handleExportCSV = () => {
    const headers = ["Registration ID", "Name", "Email", "Ticket Type", "Status", "Date"]
    const csvContent = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [reg.registrationId, reg.name, reg.email, reg.ticket, reg.status, reg.date].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${new Date().toISOString()}.csv`
    a.click()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Registrations Management</h1>

      {/* Filters & Search */}
      <Card className="p-6 border border-border mb-8">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary outline-none"
          >
            <option value="all">All Tickets</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          <Button onClick={handleExportCSV} className="bg-primary hover:bg-secondary text-primary-foreground">
            <Download size={18} className="mr-2" />
            Export CSV
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </p>
      </Card>

      {/* Table */}
      <Card className="border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Registration ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ticket</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-mono">{reg.registrationId}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{reg.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{reg.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-xs">
                      {reg.ticket}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reg.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-primary hover:text-secondary transition-colors">
                      <Mail size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
