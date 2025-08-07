/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Be sure to fix lint errors in dev!
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
