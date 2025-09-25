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
//         {nonce && <style nonce={nonce}>{""}</style>}
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

"use client";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/Providers/AppProviders";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [nonce, setNonce] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    // Pegando nonce do meta ou header
    const headerNonce = document
      .querySelector('meta[name="x-nonce"]')
      ?.getAttribute("content");
    setNonce(headerNonce || "");
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="mui-insertion-point" content="" />
        {nonce && <style nonce={nonce}>{""}</style>}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {mounted && <AppProviders nonce={nonce}>{children}</AppProviders>}
      </body>
    </html>
  );
}
