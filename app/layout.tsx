import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Hafsiz Kargo - Ваш надежный курьерский партнер",
  description: "Профессиональные услуги в сфере грузоперевозок, туризма и консалтинга",
  icons: {
    icon: [{ url: "/icon?v=1", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon?v=1", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'