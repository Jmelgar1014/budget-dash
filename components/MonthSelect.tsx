import React from "react";
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

const MonthSelect = () => {
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
        <SelectTrigger className="w-[180px] cursor-pointer">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            <SelectItem className="cursor-pointer" value="January">
              January
            </SelectItem>
            <SelectItem className="cursor-pointer" value="February">
              February
            </SelectItem>
            <SelectItem className="cursor-pointer" value="March">
              March
            </SelectItem>
            <SelectItem className="cursor-pointer" value="April">
              April
            </SelectItem>
            <SelectItem className="cursor-pointer" value="May">
              May
            </SelectItem>
            <SelectItem className="cursor-pointer" value="June">
              June
            </SelectItem>
            <SelectItem className="cursor-pointer" value="July">
              July
            </SelectItem>
            <SelectItem className="cursor-pointer" value="August">
              August
            </SelectItem>
            <SelectItem className="cursor-pointer" value="September">
              September
            </SelectItem>
            <SelectItem className="cursor-pointer" value="October">
              October
            </SelectItem>
            <SelectItem className="cursor-pointer" value="November">
              November
            </SelectItem>
            <SelectItem className="cursor-pointer" value="December">
              December
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default MonthSelect;
