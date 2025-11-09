import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/Providers/AppProviders";
import { headers } from "next/headers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RT Sports Manager",
  description: "Seu App de Gestão Esportiva",
};

// 🔥 FORÇAR RENDERIZAÇÃO DINÂMICA - ESSENCIAL PARA NONCE
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="mui-insertion-point" content="" />
        {/* Adicionar nonce ao head para MUI */}
        <meta property="csp-nonce" content={nonce} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProviders nonce={nonce}>{children}</AppProviders>
      </body>
    </html>
  );
}
