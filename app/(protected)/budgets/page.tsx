import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BudgetContainer from "@/components/BudgetContainer";
const page = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Button className="cursor-pointer " variant="ghost" asChild>
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
