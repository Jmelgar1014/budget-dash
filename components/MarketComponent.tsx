"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SignIn, SignUp, useUser, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

const MarketComponent = () => {
  const clerk = useClerk();
  const [loading, setLoading] = useState<boolean>(false);

  const createSession = async () => {
    setLoading(true);
    const session = await clerk.client.signIn.create({
      strategy: "password",
      identifier: process.env.NEXT_PUBLIC_DEMO_USER as string,
      password: process.env.NEXT_PUBLIC_DEMO_PASS as string,
    });

    await clerk.setActive({ session: session.createdSessionId });
    setLoading(false);

    console.log(clerk.user);

    router.push("/home");
  };

  const [clerkModal, setClerkModal] = useState<boolean>(false);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/home");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center py-20">
        <div className=" mx-auto px-4 space-y-12 container ">
          <div className="space-y-6 opacity-0 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-center leading-[1.2] tracking-tight">
              <span className="text-mikadoYellow font-semibold">
                Take Control
              </span>
              <br className="hidden md:block"></br> of Your Financial Future
            </h1>
          </div>
          <div className="max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            <p className="text-lg md:text-xl text-center text-zinc-300 leading-relaxed font-light">
              <span className="text-white font-semibold">BudgetWise</span> is a
              smart budgeting platform that allows you to track expenses, set
              financial goals, and watch your savings grow across any device,
              anywhere.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto pt-4 opacity-0 animate-fade-in-up delay-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Button
                className="dark:bg-gold dark:text-oxfordBlue font-semibold px-8 py-3 text-base dark:hover:border dark:hover:border-mikadoYellow cursor-pointer  dark:hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300 dark:hover:-translate-y-0.5"
                onClick={() => setClerkModal(true)}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                disabled={loading}
                className="dark:bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40  dark:text-gold font-semibold px-8 py-3 text-base dark:border dark:border-white/15 dark:hover:border-white/30  cursor-pointer dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]  transition-all duration-300 dark:hover:-translate-y-0.5"
                onClick={() => {
                  // Explore App logic will be added here
                  console.log("Explore App clicked");
                  createSession();
                }}
              >
                {loading && <Spinner />}
                Explore App
              </Button>
            </div>
            {clerkModal && (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="flex justify-center">
                  <SignIn routing="hash" fallbackRedirectUrl={"/home"} />
                </TabsContent>

                <TabsContent value="signup" className="flex justify-center">
                  <SignUp routing="hash" fallbackRedirectUrl={"/home"} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketComponent;
