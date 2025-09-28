import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/") || pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

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
    " connect-src 'self' http://localhost:3000 ws://localhost:3000 https://api.rtsportsmanager.com https://www.google-analytics.com https://servicodados.ibge.gov.br;";
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
