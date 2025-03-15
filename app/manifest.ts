import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hafsiz Kargo",
    short_name: "Hafsiz Kargo",
    description: "Ваш надежный курьерский партнер",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon?v=1",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon?v=1",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}

