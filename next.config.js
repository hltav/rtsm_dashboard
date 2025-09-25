// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   transpilePackages: [
//     "@mui/material",
//     "@mui/icons-material",
//     "@mui/system",
//     "@emotion/react",
//     "@emotion/styled",
//     "next-themes",
//   ],
//   images: {
//     domains: ["placehold.co"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "drive.google.com",
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*", // Todas as requisições para /api serão redirecionadas
//         destination: "https://api.rtsportsmanager.com/:path*", // Para o seu backend
//         //destination: "http://localhost:3000/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;

// next.config.js
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
    domains: ["placehold.co"],
    remotePatterns: [{ protocol: "https", hostname: "drive.google.com" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
