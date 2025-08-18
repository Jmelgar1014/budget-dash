"use client";

import type React from "react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { SignIn, SignUp } from "@clerk/nextjs";

export function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-primary rounded-xl">
              <PiggyBank className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground">
              BudgetWise
            </h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground leading-tight">
              Take Control of Your Financial Future
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Smart budgeting with beautiful insights. Track expenses, set
              goals, and watch your savings grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
            <div className="text-center space-y-2">
              <div className="p-3 bg-accent/10 rounded-lg inline-block">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium">Smart Analytics</p>
            </div>
            <div className="text-center space-y-2">
              <div className="p-3 bg-chart-3/10 rounded-lg inline-block">
                <Shield className="h-6 w-6 text-chart-3" />
              </div>
              <p className="text-sm font-medium">Secure & Private</p>
            </div>
            <div className="text-center space-y-2">
              <div className="p-3 bg-chart-4/10 rounded-lg inline-block">
                <BarChart3 className="h-6 w-6 text-chart-4" />
              </div>
              <p className="text-sm font-medium">Visual Reports</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <SignIn routing="hash" fallbackRedirectUrl={"/home"} />
            </TabsContent>

            <TabsContent value="signup">
              <SignUp routing="hash" fallbackRedirectUrl={"/home"} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
