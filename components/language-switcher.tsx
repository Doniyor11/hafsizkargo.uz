"use client"

import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-white" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[120px] border-none bg-transparent hover:bg-gray-900 focus:ring-0 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="uz">O'zbekcha</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

