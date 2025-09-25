// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { AppProviders } from "@/components/Providers/AppProviders";
// import { headers } from "next/headers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "RT Sports Manager",
//   description: "Seu App de Gestão Esportiva",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const headerList = await headers();
//   const nonce = headerList.get("x-nonce") || "";

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <meta name="google" content="notranslate" />
//         <meta name="mui-insertion-point" content="" />
//         {nonce && <style nonce={nonce} />}
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//         <AppProviders nonce={nonce}>{children}</AppProviders>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/Providers/AppProviders";
import crypto from "crypto";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RT Sports Manager",
  description: "Seu App de Gestão Esportiva",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Gera um nonce aleatório para cada request (server-side)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // CSP seguro usando o nonce
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://apis.google.com;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: https://www.google-analytics.com https://drive.google.com placehold.co;
    connect-src 'self' https://www.google-analytics.com https://api.rtsportsmanager.com;
    frame-src 'self' https://www.youtube.com;
    base-uri 'self';
    form-action 'self';
  `.replace(/\s+/g, " ").trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="mui-insertion-point" content="" />
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        {/* Se precisar de style inline server-side */}
        {nonce && <style nonce={nonce} />}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AppProviders nonce={nonce}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
