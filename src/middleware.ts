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

// Função para gerar um Nonce criptográfico seguro
function generateNonce() {
  const bytes = new Uint8Array(16);
  // Usa a API Web Crypto do ambiente Next.js/Vercel
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64");
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const res = NextResponse.next();

  // --- 1. LÓGICA DE IGNORAR REQUISIÇÕES INTERNAS/ESTÁTICAS ---
  // Esta lógica deve vir antes dos cabeçalhos para evitar processamento desnecessário.
  if (
    request.nextUrl.searchParams.has("_rsc") ||
    request.headers.get("rsc") === "1" ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    // request.nextUrl.pathname.startsWith('/api/') é inofensivo se você não tem rotas internas,
    // mas o .includes('.') já cobriria qualquer coisa que se pareça com um arquivo estático.
    request.nextUrl.pathname.includes(".")
  ) {
    // console.log('Ignoring internal request');
    return NextResponse.next();
  }

  // --- 2. INJEÇÃO DOS CABEÇALHOS DE SEGURANÇA (NOTA A+) ---

  // Content-Security-Policy: Removido 'unsafe-inline' e substituído por 'nonce-${nonce}'
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

  // Define o Nonce no cabeçalho x-nonce (o layout o lerá para o HTML e MUI)
  res.headers.set("x-nonce", nonce);

  // Define o CSP dinâmico
  res.headers.set("Content-Security-Policy", ContentSecurityPolicy);

  // Define os outros cabeçalhos de segurança (HSTS, etc.)
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN"); // Evita Clickjacking
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=()"
  );

  // --- 3. LÓGICA DE AUTENTICAÇÃO E REDIRECIONAMENTO ---

  const accessToken = request.cookies.get("access_token");
  // console.log('Access token present:', !!accessToken);

  if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    // console.log('Redirecting to login');
    // Retornamos o redirecionamento aqui, encerrando a requisição
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && request.nextUrl.pathname === "/login") {
    // console.log('Redirecting to dashboard');
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Retorna a resposta com os cabeçalhos de segurança injetados
  return res;
}

export const config = {
  // Ajusta o matcher para rodar em TODAS as páginas HTML que precisam de segurança
  // (A lógica interna de ignorar lida com os assets)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
