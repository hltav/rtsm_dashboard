import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log('=== MIDDLEWARE DEBUG ===');
  console.log('URL:', request.url);
  console.log('Path:', request.nextUrl.pathname);
  console.log('Query:', request.nextUrl.search);
  console.log('Has _rsc:', request.nextUrl.searchParams.has('_rsc'));
  console.log('RSC header:', request.headers.get('rsc'));
  console.log('Cookies:', request.cookies.getAll());
  console.log('========================');

  // Ignorar requisições RSC e internas
  if (
    request.nextUrl.searchParams.has('_rsc') ||
    request.headers.get('rsc') === '1' ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    console.log('Ignoring internal request');
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token");
  console.log('Access token present:', !!accessToken);

  if (!accessToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && request.nextUrl.pathname === '/login') {
    console.log('Redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};