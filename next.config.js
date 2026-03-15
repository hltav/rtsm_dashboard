/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@mui/material",
    "@mui/icons-material",
    "@mui/system",
    "@emotion/react",
    "@emotion/styled",
    "next-themes",
  ],
  images: {
    domains: ["placehold.co", "media.api-sports.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      // 🎯 ADICIONA SEU PROXY - LOCALHOST (DEV)
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/proxy/images/**",
      },
      // 🎯 ADICIONA SEU PROXY - PRODUÇÃO
      {
        protocol: "https",
        hostname: "api.rtsportsmanager.com",
        port: "",
        pathname: "/proxy/images/**",
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
      {
        source: "/proxy/images/:encodedUrl",
        destination: `${apiUrl}/proxy/images/:encodedUrl`,
      },
    ];
  },
};

export default nextConfig;
