/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
