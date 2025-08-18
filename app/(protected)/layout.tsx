import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { PiggyBank } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BudgetWise - Smart Financial Management",
  description: "Modern budgeting app with intelligent insights",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${inter.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <PiggyBank className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      BudgetWise
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Welcome back, John!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
