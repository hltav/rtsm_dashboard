import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/") || pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;

  // --- CONFIGURAÇÃO DE SEGURANÇA (CSP) ---
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
    " img-src 'self' data: blob: https://api.rtsportsmanager.com https://localhost:3000 https://localhost:3001 https://www.google-analytics.com https://drive.google.com placehold.co;";
  cspHeader +=
    " connect-src 'self' https://localhost:3000 ws://localhost:3000 https://api.rtsportsmanager.com https://www.google-analytics.com https://servicodados.ibge.gov.br;";
  cspHeader += " frame-src 'self' https://www.youtube.com;";
  cspHeader += " worker-src 'self' blob:;";
  cspHeader += " base-uri 'self';";
  cspHeader += " form-action 'self';";
  cspHeader += " frame-ancestors 'none';";

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("x-nonce", nonce);

  // 🔒 Headers extras de segurança
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Powered-By", "");

  // --- 🛡️ PROTEÇÃO DE ROTAS (APENAS AUTENTICAÇÃO) ---

  // Protege rotas autenticadas
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirecionar se já estiver logado (Login/Register)
  const authRoutes = ["/login", "/register"];
  if (authRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/|auth/|_next/static|_next/image|favicon.ico).*)"],
};
