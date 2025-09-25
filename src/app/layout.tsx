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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/Providers/AppProviders";
import { headers } from "next/headers";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const nonce = headerList.get("x-nonce") || "";

  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="mui-insertion-point" content="" />

        <style data-emotion="mui" nonce={nonce || undefined}>
          {""}
        </style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders nonce={nonce}>{children}</AppProviders>
      </body>
    </html>
  );
}
