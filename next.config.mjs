/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'github.com'],
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Enable static exports for deployment
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Disable middleware for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
