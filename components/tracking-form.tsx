"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/language-context"

interface Status {
  Name: string
  Date: string
}

interface TrackingResult {
  status: string
  trackingNumber: string
  recipient: string
  sender: string
  weight: number
  cost: number
  Statuses: Status[]
}

export default function TrackingForm() {
  const { t, language } = useLanguage()
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError(language === "ru" ? "Пожалуйста, введите номер отслеживания" : "Iltimos, kuzatuv raqamini kiriting")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || (language === "ru" ? "Ошибка при отслеживании посылки" : "Yuborma kuzatuvida xatolik"),
        )
      }

      setTrackingResult(data.data)

      // If there's a note about mock data, show it to the user
      if (data.note) {
        console.log(data.note)
        setError(
          language === "ru"
            ? "Примечание: Используются тестовые данные из-за проблем с подключением к API"
            : "Eslatma: API ulanishidagi muammolar tufayli sinov ma'lumotlaridan foydalanilmoqda",
        )
      }
    } catch (err) {
      console.error("Error in tracking form:", err)
      setError(
        err instanceof Error
          ? err.message
          : language === "ru"
            ? "Произошла ошибка при отслеживании. Пожалуйста, попробуйте позже."
            : "Kuzatuv paytida xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
      )
      setTrackingResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Format date from API to "DD.MM.YYYY HH:MM:SS"
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    try {
      const [datePart, timePart] = dateString.split(" ")
      if (!datePart || !timePart) return dateString

      const [year, month, day] = datePart.split("-")
      if (!year || !month || !day) return dateString

      return `${day}.${month}.${year} ${timePart}`
    } catch (e) {
      return dateString
    }
  }

  // Define all possible statuses in order with translations
  const allStatuses = [
    { key: "status.packaging", ru: "На упаковке", uz: "Qadoqlashda" },
    { key: "status.sent", ru: "Посылка отправлено", uz: "Yuborma jo'natildi" },
    { key: "status.customs", ru: "Таможенном оформлении", uz: "Bojxona rasmiylashtiruvi" },
    { key: "status.warehouse", ru: "На складе", uz: "Omborxonada" },
    { key: "status.delivery", ru: "На доставке", uz: "Yetkazib berishda" },
  ]

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder={t("track.placeholder")}
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1 h-12 text-center text-lg placeholder:text-center"
        />
        <Button
          type="submit"
          className="h-12 px-8 text-base bg-[#2563EB] hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
          {t("track.button")}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">{t("track.support")}</p>

      {error && (
        <Alert className="mt-4 max-w-md mx-auto border-red-200 bg-red-50 text-red-800">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {trackingResult && (
        <div className="mt-8 p-6 bg-white rounded-lg border shadow-sm max-w-2xl mx-auto">
          <h3 className="font-semibold text-lg mb-4">{t("tracking.info")}</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">{t("tracking.number")}</span>
              <span className="font-medium">{trackingResult.trackingNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t("tracking.sender")}</span>
              <span className="font-medium">{trackingResult.sender}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t("tracking.recipient")}</span>
              <span className="font-medium">{trackingResult.recipient}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t("tracking.weight")}</span>
              <span className="font-medium">
                {trackingResult.weight} {t("tracking.kg")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t("tracking.cost")}</span>
              <span className="font-medium">
                {trackingResult.cost} {t("tracking.sum")}
              </span>
            </div>
          </div>

          {trackingResult.Statuses && trackingResult.Statuses.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-6">{t("tracking.history")}</h4>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100" />

                {/* Status items */}
                <div className="space-y-6">
                  {allStatuses.map((statusItem, index) => {
                    const status = trackingResult.Statuses.find((s) => s.Name === statusItem.ru)
                    const isActive = !!status?.Date

                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`relative w-4 h-4 rounded-full mt-1 ${isActive ? "bg-blue-600" : "bg-gray-200"}`}
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                            {language === "ru" ? statusItem.ru : statusItem.uz}
                          </p>
                          {status?.Date && <p className="text-sm text-gray-500">{formatDate(status.Date)}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

