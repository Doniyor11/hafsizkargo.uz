"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: null })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setStatus({
        type: "success",
        message: t("contact.success"),
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: t("contact.error"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="relative py-16 px-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-blue-900/90 z-0" />

      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-center">{t("contact.title")}</h2>
          <p className="text-gray-600 mb-8 text-center">{t("contact.description")}</p>

          {status.type && (
            <Alert
              className={`mb-6 ${
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder={t("contact.firstName")}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="lastName"
                  placeholder={t("contact.lastName")}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Input
                type="tel"
                name="phone"
                placeholder={t("contact.phone")}
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder={t("contact.email")}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder={t("contact.message")}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[120px]"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  t("contact.submit")
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

