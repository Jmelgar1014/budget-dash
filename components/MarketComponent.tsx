"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState } from "react";
const MarketComponent = () => {
  const [clerkModal, setClerkModal] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className=" mx-auto px-4 space-y-8 container ">
          <h1 className="text-7xl font-extrabold text-center leading-[1.1] ">
            <span className="text-mikadoYellow ">Take Control</span>
            <br></br> of Your Financial Future
          </h1>
          <div>
            <p className="text-2xl text-center text-zinc-400 leading-[1.5]">
              <span className="text-white font-bold">BudgetWise</span> is a
              smart budgeting platform that allows you to track expenses, set
              financial goals, and watch your savings grow across any device,
              anywhere.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <Button
                className="dark:bg-yaleBlue dark:text-gold font-bold dark:hover:border dark:hover:border-mikadoYellow cursor-pointer dark:hover:shadow-md dark:hover:shadow-gold"
                onClick={() => setClerkModal(true)}
              >
                Get Started
              </Button>
            </div>
            {clerkModal && (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="flex justify-center">
                  <SignIn
                    routing="hash"
                    fallbackRedirectUrl={"/home"}
                    appearance={{
                      elements: {
                        card: {
                          backgroundColor: "bg-green-400",
                        },
                      },
                    }}
                  />
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
