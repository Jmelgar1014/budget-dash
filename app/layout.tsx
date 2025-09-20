import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/hooks/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { shadcn } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BudgetWise - Smart Financial Management",
  description: "Modern budgeting app with intelligent insights",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: shadcn }}>
      <html lang="en" className="dark">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </head>
        <body className={`${inter.variable} ${inter.variable} antialiased`}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
