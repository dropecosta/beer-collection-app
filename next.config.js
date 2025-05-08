/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['punkapi.online'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'punkapi.online',
        port: '',
        pathname: '/v3/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CATALOG_BASE_URL: process.env.NEXT_PUBLIC_CATALOG_BASE_URL,
    NEXT_PUBLIC_CATALOG_API_KEY: process.env.NEXT_PUBLIC_CATALOG_API_KEY,
  },
}