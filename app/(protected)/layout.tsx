"use client";
import type React from "react";
import "../globals.css";
import { useEffect, useState } from "react";
import { shadcn } from "@clerk/themes";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { MoonStar, PiggyBank, Plus, Sun } from "lucide-react";
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
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };
  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    };

    checkTheme();
  }, []);

  return (
    <ClerkProvider appearance={{ baseTheme: shadcn }}>
      <header className="flex justify-end items-center p-4 gap-4 sm:h-16  border-b  dark:bg-richBlack backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex sm:items-center sm:justify-between flex-col sm:flex-row ">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-gold to-yaleBlue rounded-lg">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-gold to-yaleBlue bg-clip-text text-transparent">
                    BudgetWise
                  </h1>
                  <p className="text-sm text-muted-foreground">Welcome back!</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center sm:gap-3 gap-6 flex-col sm:flex-row m-4">
              <Button
                variant="outline"
                className="cursor-pointer w-full sm:w-40 dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
              <Button
                onClick={handleDarkMode}
                className="w-full sm:w-10  cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="cursor-pointer" />
                ) : (
                  <MoonStar className="cursor-pointer" />
                )}
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
