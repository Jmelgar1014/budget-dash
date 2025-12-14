import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BudgetContainer from "@/components/BudgetContainer";
const page = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
        <Button
          className="cursor-pointer dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow text-white"
          variant="ghost"
          asChild
        >
          <Link href="/">
            <ArrowLeft />
            Back to Dashboard
          </Link>
        </Button>

        <BudgetContainer />
      </main>
    </>
  );
};

export default page;
