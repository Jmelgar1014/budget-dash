import React from "react";
import { Button } from "./ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";

const ManageBudgets = () => {
  return (
    <>
      <main>
        <div className="grid grid-cols-1 space-x-2">
          <Link
            href="/budgets"
            className="block rounded-md shadow-md h-28 bg-card p-4 hover:shadow-xl hover:cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="m-2">
                <div className="bg-green-600 h-9 w-10 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ease-in-out">
                  <Settings2 color="white" size={18} className="" />
                </div>
              </div>
              <div className="m-2">
                <p className="text-xl font-bold">Manage Budgets</p>
                <p className="font-semibold text-zinc-500">
                  Set and track your budget goals
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
};

export default ManageBudgets;
