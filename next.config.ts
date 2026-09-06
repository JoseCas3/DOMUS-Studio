import type { NextConfig } from "next";

// Configuración general del framework Next.js
const nextConfig: NextConfig = {
  images: {
    // Por seguridad, Next.js requiere autorizar explícitamente los dominios externos
    // desde donde se descargan y optimizan imágenes (como Unsplash).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

