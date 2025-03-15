import { NextResponse } from "next/server"

const BOT_TOKEN = "7650143276:AAFOwr4R9HPJYqcw61Be7u4zmIs42Lb9F8c"
const CHAT_ID = "-1002340938586"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { firstName, lastName, phone, email, message } = data

    // Format message for Telegram
    const telegramMessage = `
🔔 Новая заявка с сайта Hafsiz Kargo

👤 Имя: ${firstName}
👤 Фамилия: ${lastName}
📱 Телефон: ${phone}
📧 Email: ${email}
💬 Сообщение:
${message}
    `

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}

