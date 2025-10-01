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
            className="block rounded-md shadow-md h-28 bg-card dark:bg-gradient-to-br from-richBlack to-oxfordBlue p-4 hover:shadow-xl hover:cursor-pointer group"
          >
            <div className="flex items-center h-full">
              <div className="m-2">
                <div className="bg-mikadoYellow h-9 w-10 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ease-in-out">
                  <Settings2 color="black" size={18} className="" />
                </div>
              </div>
              <div className="m-2">
                <h3 className=" font-semibold">Manage Budgets</h3>
                <p className="text-sm text-muted-foreground ">
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
