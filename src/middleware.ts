// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log('=== MIDDLEWARE DEBUG ===');
//   console.log('URL:', request.url);
//   console.log('Path:', request.nextUrl.pathname);
//   console.log('Query:', request.nextUrl.search);
//   console.log('Has _rsc:', request.nextUrl.searchParams.has('_rsc'));
//   console.log('RSC header:', request.headers.get('rsc'));
//   console.log('Cookies:', request.cookies.getAll());
//   console.log('========================');

//   // Ignorar requisições RSC e internas
//   if (
//     request.nextUrl.searchParams.has('_rsc') ||
//     request.headers.get('rsc') === '1' ||
//     request.nextUrl.pathname.startsWith('/_next/') ||
//     request.nextUrl.pathname.startsWith('/api/') ||
//     request.nextUrl.pathname.includes('.')
//   ) {
//     console.log('Ignoring internal request');
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("access_token");
//   console.log('Access token present:', !!accessToken);

//   if (!accessToken && request.nextUrl.pathname.startsWith('/dashboard')) {
//     console.log('Redirecting to login');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (accessToken && request.nextUrl.pathname === '/login') {
//     console.log('Redirecting to dashboard');
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function generateNonce() {
  const bytes = new Uint8Array(16);

  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64");
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const res = NextResponse.next();

  if (
    request.nextUrl.searchParams.has("_rsc") ||
    request.headers.get("rsc") === "1" ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com 'unsafe-inline';
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: https://www.google-analytics.com https://drive.google.com placehold.co;
    connect-src 'self' https://www.google-analytics.com https://api.rtsportsmanager.com;
    frame-src 'self' https://www.youtube.com;
    base-uri 'self';
    form-action 'self';
  `
    .replace(/\s+/g, " ")
    .trim();

  res.headers.set("x-nonce", nonce);

  res.headers.set("Content-Security-Policy", ContentSecurityPolicy);

  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=()"
  );

  const accessToken = request.cookies.get("access_token");

  if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
