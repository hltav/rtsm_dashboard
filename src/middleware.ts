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
      script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
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
