"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Step1BasicDetails from "./registration-steps/step1-basic-details"
import Step2Tickets from "./registration-steps/step2-tickets"
import Step3AdditionalDetails from "./registration-steps/step3-additional-details"

interface FormData {
  // Step 1
  name: string
  chapterName: string
  category: string
  contactNo: string
  email: string

  // Step 2
  ticketType: "Platinum" | "Gold" | "Silver" | ""

  // Step 3
  spouseName?: string
  children: Array<{ name: string; age: "<12" | ">12" }>
  participations: string[]
  conclavGroups: string[]
}

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    chapterName: "",
    category: "",
    contactNo: "",
    email: "",
    ticketType: "",
    spouseName: "",
    children: [
      { name: "", age: "<12" },
      { name: "", age: "<12" },
      { name: "", age: "<12" },
    ],
    participations: [],
    conclavGroups: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("registrationForm")
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load saved form data")
      }
    }
  }, [])

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("registrationForm", JSON.stringify(formData))
  }, [formData])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.chapterName.trim()) newErrors.chapterName = "Chapter name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.contactNo.trim()) newErrors.contactNo = "Contact number is required"
    if (!/^\d{10}$/.test(formData.contactNo.replace(/\D/g, ""))) {
      newErrors.contactNo = "Please enter a valid 10-digit phone number"
    }
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.ticketType) {
      newErrors.ticketType = "Please select a ticket type"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // All data has been validated
    console.log("Form submitted:", formData)
    // TODO: Send to API
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 mx-1 rounded-full transition-all ${
                step <= currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={currentStep === 1 ? "text-primary font-semibold" : "text-muted-foreground"}>
            Step 1: Basic Details
          </span>
          <span className={currentStep === 2 ? "text-primary font-semibold" : "text-muted-foreground"}>
            Step 2: Tickets
          </span>
          <span className={currentStep === 3 ? "text-primary font-semibold" : "text-muted-foreground"}>
            Step 3: Additional Info
          </span>
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-background border border-border rounded-lg p-8 md:p-12 mb-8">
        {currentStep === 1 && <Step1BasicDetails formData={formData} setFormData={setFormData} errors={errors} />}
        {currentStep === 2 && <Step2Tickets formData={formData} setFormData={setFormData} errors={errors} />}
        {currentStep === 3 && <Step3AdditionalDetails formData={formData} setFormData={setFormData} />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={
            currentStep === 1
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-muted text-foreground hover:bg-border"
          }
        >
          <ChevronLeft size={18} className="mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground self-center">Step {currentStep} of 3</div>

        {currentStep < 3 ? (
          <Button onClick={handleNext} className="bg-primary hover:bg-secondary text-primary-foreground">
            Next
            <ChevronRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-primary hover:bg-secondary text-primary-foreground">
            Complete Registration
          </Button>
        )}
      </div>
    </div>
  )
}
