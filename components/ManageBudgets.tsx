import React from "react";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const ManageBudgets = () => {
  return (
    <>
      <main>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="grid grid-cols-1 space-x-2"
        >
          <Link
            href="/budgets"
            className="block rounded-md h-28 bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40 border border-white/5 hover:border-white/10 p-4 hover:shadow-xl hover:cursor-pointer group relative overflow-hidden transition-all duration-300 hover:scale-[1.005]"
          >
            {/* White shine hover effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex items-center h-full relative">
              <div className="m-2">
                <div className="bg-mikadoYellow h-9 w-10 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ease-in-out">
                  <Settings2 color="black" size={18} className="" />
                </div>
              </div>
              <div className="m-2">
                <h3 className="font-semibold">Manage Budgets</h3>
                <p className="text-sm text-muted-foreground">
                  Set and track your budget goals
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </main>
    </>
  );
};

export default ManageBudgets;
