import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MonthSelectContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeMonth = (month: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", month);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Select onValueChange={changeMonth}>
        <SelectTrigger className="w-[180px] cursor-pointer dark:bg-richBlack dark:hover:bg-mikadoYellow dark:hover:text-oxfordBlue dark:border-mikadoYellow dark:text-white bg-yaleBlue text-white !text-white">
          <SelectValue placeholder="Select Month" className="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            <SelectItem className="cursor-pointer " value="01">
              January
            </SelectItem>
            <SelectItem className="cursor-pointer" value="02">
              February
            </SelectItem>
            <SelectItem className="cursor-pointer" value="03">
              March
            </SelectItem>
            <SelectItem className="cursor-pointer" value="04">
              April
            </SelectItem>
            <SelectItem className="cursor-pointer" value="05">
              May
            </SelectItem>
            <SelectItem className="cursor-pointer" value="06">
              June
            </SelectItem>
            <SelectItem className="cursor-pointer" value="07">
              July
            </SelectItem>
            <SelectItem className="cursor-pointer" value="08">
              August
            </SelectItem>
            <SelectItem className="cursor-pointer" value="09">
              September
            </SelectItem>
            <SelectItem className="cursor-pointer" value="10">
              October
            </SelectItem>
            <SelectItem className="cursor-pointer" value="11">
              November
            </SelectItem>
            <SelectItem className="cursor-pointer" value="12">
              December
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

const MonthSelect = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MonthSelectContent />
    </Suspense>
  );
};

export default MonthSelect;
