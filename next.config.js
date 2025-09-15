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
//   },
//    async rewrites() {
//      return [
//        {
//          source: '/api/:path*', // Todas as requisições para /api serão redirecionadas
//          destination: 'https://apirtsmanager.duckdns.org/:path*', // Para o seu backend
//        },
//      ];
//    },
// };

// export default nextConfig;

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
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
        // usa BACKEND_URL das envs
      },
    ];
  },
};

export default nextConfig;
