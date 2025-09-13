"use client";
import type React from "react";
import "../globals.css";
import { useState } from "react";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { PiggyBank, Plus } from "lucide-react";
import { ConvexClientProvider } from "../../app/ConvexClientProvider";
import { Button } from "@/components/ui/button";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <ClerkProvider>
      <header className="flex justify-end items-center p-4 gap-4 h-16 border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    BudgetWise
                  </h1>
                  <p className="text-sm text-muted-foreground">Welcome back!</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
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
      <ConvexClientProvider>
        {children}
        {isModalOpen && (
          <AddTransactionModal onClose={() => setIsModalOpen(false)} />
        )}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
