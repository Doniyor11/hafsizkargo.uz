import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wRKySQSIrQPudi26K0KnrsJEe2Qcwc.png"
        alt="Hafsiz Kargo Logo"
        width={32}
        height={32}
        style={{
          objectFit: "contain",
        }}
      />
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

