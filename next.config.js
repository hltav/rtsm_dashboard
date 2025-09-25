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
        source: "/api/:path*",
        destination: "https://api.rtsportsmanager.com/:path*",
      },
    ];
  },
  async headers() {
    // CSP MELHORADA - Sem unsafe-* e mais segura
    const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
      style-src 'self' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: https://www.google-analytics.com https://drive.google.com placehold.co;
      connect-src 'self' https://www.google-analytics.com https://api.rtsportsmanager.com;
      frame-src 'self' https://www.youtube.com;
      child-src 'self' https://www.youtube.com;
      base-uri 'self';
      form-action 'self';
      object-src 'none';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim();

    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=(), fullscreen=()' },
      { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-XSS-Protection', value: '0' }, // Desativado porque CSP é mais eficaz
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

