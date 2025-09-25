// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     // Ignorar requisições RSC e internas
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

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  console.log('MIDDLEWARE: ',nonce);

  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
      style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: https://www.google-analytics.com https://drive.google.com placehold.co;
      connect-src 'self' https://www.google-analytics.com https://api.rtsportsmanager.com;
      frame-src 'self' https://www.youtube.com;
      base-uri 'self';
      form-action 'self';
    `
      .replace(/\s+/g, " ")
      .trim()
  );

  response.headers.set("x-nonce", nonce);

  const accessToken = request.cookies.get("access_token")?.value;
  const url = request.nextUrl.clone();

  if (!accessToken && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (accessToken && url.pathname === "/login") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
