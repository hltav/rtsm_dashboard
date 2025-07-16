// next.config.js
const nextConfig = {
  transpilePackages: [
    '@mui/material',
    '@mui/icons-material',
    '@mui/system',
    '@emotion/react',
    '@emotion/styled',
    'next-themes'
  ],
  images: {
    domains: ['placehold.co'],
  },
}

module.exports = nextConfig