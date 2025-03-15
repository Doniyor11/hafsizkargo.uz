import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-[60px] h-[60px] bg-white p-2 rounded-lg shadow-sm">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wRKySQSIrQPudi26K0KnrsJEe2Qcwc.png"
          alt="Hafsiz Kargo"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  )
}

