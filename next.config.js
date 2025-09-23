/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@mui/material",
    "@mui/icons-material",
    "@mui/system",
    "@emotion/react",
    "@emotion/styled",
    "next-themes",
  ],
  images: {
    domains: ["placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Todas as requisições para /api serão redirecionadas
        destination: "https://api.rtsportsmanager.com/:path*", // Para o seu backend
        //destination: "http://localhost:3000/:path*",
      },
    ];
  },
};

export default nextConfig;


