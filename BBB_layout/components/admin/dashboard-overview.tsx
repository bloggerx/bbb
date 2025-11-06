"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, Users, CreditCard, TrendingUp } from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalRevenue: 0,
    ticketsSold: { platinum: 0, gold: 0, silver: 0 },
    recentRegistrations: [] as any[],
  })

  useEffect(() => {
    // TODO: Fetch from API
    setStats({
      totalParticipants: 2847,
      totalRevenue: 5694000,
      ticketsSold: { platinum: 450, gold: 780, silver: 1617 },
      recentRegistrations: [
        { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", ticket: "Platinum", date: "2025-02-20" },
        { id: 2, name: "Priya Singh", email: "priya@example.com", ticket: "Gold", date: "2025-02-20" },
        { id: 3, name: "Arun Patel", email: "arun@example.com", ticket: "Silver", date: "2025-02-19" },
      ],
    })
  }, [])

  const StatCard = ({ icon: Icon, label, value, change }: any) => (
    <Card className="p-6 border border-border">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground font-semibold">{label}</p>
        <Icon size={20} className="text-primary" />
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-xs text-green-600 flex items-center gap-1">
        <ArrowUpRight size={14} /> {change}
      </p>
    </Card>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Participants"
          value={stats.totalParticipants.toLocaleString()}
          change="+12% from last month"
        />
        <StatCard
          icon={CreditCard}
          label="Total Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
          change="+8% from last month"
        />
        <StatCard icon={TrendingUp} label="Platinum Tickets" value={stats.ticketsSold.platinum} change="+2 today" />
        <StatCard
          icon={TrendingUp}
          label="Average Order Value"
          value={`₹${Math.round(stats.totalRevenue / stats.totalParticipants)}`}
          change="Stable"
        />
      </div>

      {/* Ticket Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Ticket Distribution</h2>
          <div className="space-y-4">
            {[
              { tier: "Platinum", count: stats.ticketsSold.platinum, color: "bg-primary" },
              { tier: "Gold", count: stats.ticketsSold.gold, color: "bg-secondary" },
              { tier: "Silver", count: stats.ticketsSold.silver, color: "bg-accent" },
            ].map((ticket) => (
              <div key={ticket.tier}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">{ticket.tier}</span>
                  <span className="text-sm text-muted-foreground">{ticket.count} tickets</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`${ticket.color} h-2 rounded-full`}
                    style={{
                      width: `${(ticket.count / stats.totalParticipants) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Registrations</h2>
          <div className="space-y-3">
            {stats.recentRegistrations.map((reg) => (
              <div key={reg.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-foreground">{reg.name}</p>
                  <p className="text-xs text-muted-foreground">{reg.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                  {reg.ticket}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
