export interface Registration {
  id: string
  registrationId: string
  name: string
  chapterName: string
  category: string
  contactNo: string
  email: string
  ticketType: "Platinum" | "Gold" | "Silver"
  paymentStatus: "pending" | "success" | "failed"
  paymentId?: string
  paymentReference?: string
  spouseName?: string
  children: ChildInfo[]
  participations: string[]
  conclavGroups: string[]
  qrCode?: string
  createdAt: Date
  updatedAt: Date
}

export interface ChildInfo {
  name: string
  age: "<12" | ">12"
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  category: "Platinum" | "Gold" | "Silver"
  description: string
  socialLinks?: Record<string, string>
}

export interface GalleryItem {
  id: string
  type: "image" | "video"
  url: string
  title: string
  tags: string[]
  createdAt: Date
}

export interface TicketOption {
  tier: "Platinum" | "Gold" | "Silver"
  price: number
  features: string[]
}
