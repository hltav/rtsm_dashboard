// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

//   const response = NextResponse.next();

//   response.headers.set(
//     "Content-Security-Policy",
//     `
//       default-src 'self';
//       script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
//       style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
//       font-src 'self' https://fonts.gstatic.com;
//       img-src 'self' data: https: https://www.google-analytics.com https://drive.google.com placehold.co;
//       connect-src 'self' https://www.google-analytics.com https://api.rtsportsmanager.com;
//       frame-src 'self' https://www.youtube.com;
//       base-uri 'self';
//       form-action 'self';
//     `
//       .replace(/\s+/g, " ")
//       .trim()
//   );

//   response.headers.set("x-nonce", nonce);

//   const accessToken = request.cookies.get("access_token")?.value;
//   const url = request.nextUrl.clone();

//   if (!accessToken && url.pathname.startsWith("/dashboard")) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   if (accessToken && url.pathname === "/login") {
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard"],
// };

// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
//   const isDev = process.env.NODE_ENV === "development";

//   // CSP otimizado para MUI e Next.js
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
//     isDev ? "'unsafe-eval'" : ""
//   } https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
//     style-src 'self' 'nonce-${nonce}' ${
//     isDev ? "'unsafe-inline'" : ""
//   } https://fonts.googleapis.com;
//     font-src 'self' https://fonts.gstatic.com;
//     img-src 'self' data: blob: https: https://www.google-analytics.com https://drive.google.com placehold.co;
//     connect-src 'self' http://localhost:3000 https://api.rtsportsmanager.com https://www.google-analytics.com;  // ← ADICIONAR localhost:3000
//     frame-src 'self' https://www.youtube.com;
//     worker-src 'self' blob:;
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//   `
//     .replace(/\s{2,}/g, " ")
//     .trim();

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-nonce", nonce);
//   requestHeaders.set("Content-Security-Policy", cspHeader);

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

//   response.headers.set("Content-Security-Policy", cspHeader);

//   // Lógica de autenticação (mantida do seu código)
//   const accessToken = request.cookies.get("access_token")?.value;
//   const url = request.nextUrl.clone();

//   if (!accessToken && url.pathname.startsWith("/dashboard")) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   if (accessToken && url.pathname === "/login") {
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - Inclui APIs agora
//      */
//     {
//       source: "/((?!_next/static|_next/image|favicon.ico).*)",
//       missing: [
//         { type: "header", key: "next-router-prefetch" },
//         { type: "header", key: "purpose", value: "prefetch" },
//       ],
//     },
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Não aplicar CSP para APIs e auth routes
  if (pathname.startsWith("/api/") || pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  // 🔥 Criar CSP como string simples sem template literals complexos
  let cspHeader = "default-src 'self';";
  cspHeader += ` script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;
  if (isDev) cspHeader += " 'unsafe-eval'";
  cspHeader +=
    " https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;";

  cspHeader += ` style-src 'self' 'nonce-${nonce}'`;
  if (isDev) cspHeader += " 'unsafe-inline'";
  cspHeader += " https://fonts.googleapis.com;";

  cspHeader += " font-src 'self' https://fonts.gstatic.com;";
  cspHeader +=
    " img-src 'self' data: blob: https: https://www.google-analytics.com https://drive.google.com placehold.co;";
  cspHeader +=
    " connect-src 'self' http://localhost:3000 ws://localhost:3000 https://api.rtsportsmanager.com https://www.google-analytics.com;";
  cspHeader += " frame-src 'self' https://www.youtube.com;";
  cspHeader += " worker-src 'self' blob:;";
  cspHeader += " base-uri 'self';";
  cspHeader += " form-action 'self';";
  cspHeader += " frame-ancestors 'none';";

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("x-nonce", nonce);

  // Lógica de autenticação
  if (pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/|auth/|_next/static|_next/image|favicon.ico).*)"],
};
