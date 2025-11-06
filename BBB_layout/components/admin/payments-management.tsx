"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<any[]>([])

  useEffect(() => {
    // TODO: Fetch from API
    setPayments([
      {
        id: 1,
        registrationId: "CHESS-2025-ABC123",
        orderId: "order_1234567890",
        amount: 3000,
        status: "Success",
        date: "2025-02-20",
      },
      {
        id: 2,
        registrationId: "CHESS-2025-DEF456",
        orderId: "order_0987654321",
        amount: 2000,
        status: "Success",
        date: "2025-02-20",
      },
    ])
  }, [])

  const totalRevenue = payments.filter((p) => p.status === "Success").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Payments Management</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground">₹{(totalRevenue / 100000).toFixed(1)}L</p>
        </Card>
        <Card className="p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Successful Payments</p>
          <p className="text-3xl font-bold text-foreground">{payments.filter((p) => p.status === "Success").length}</p>
        </Card>
        <Card className="p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-foreground">{payments.filter((p) => p.status === "Pending").length}</p>
        </Card>
      </div>

      <Card className="border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Registration</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground font-mono">{payment.orderId}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{payment.registrationId}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-semibold">₹{payment.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
