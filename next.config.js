/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['by1.net']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig