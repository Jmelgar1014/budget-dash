"use client";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { ChevronDown, Search, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface filterTransactions {
  setInputValue: (value: string) => void;
  inputValue: string;
  resultAmount: number;
  setCategoryValue: (value: string) => void;
  categoryValue: string;
}

const TransactionSearch = ({
  setInputValue,
  inputValue,
  resultAmount,
  setCategoryValue,
  categoryValue,
}: filterTransactions) => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const dropwdownValues = [
    {
      dropdownId: 1,
      dropwdownValue: "Food",
    },
    {
      dropdownId: 2,
      dropwdownValue: "Transportation",
    },
    {
      dropdownId: 3,
      dropwdownValue: "Utilities",
    },
    {
      dropdownId: 4,
      dropwdownValue: "Salary",
    },
    {
      dropdownId: 5,
      dropwdownValue: "Fixed Expenses",
    },
    {
      dropdownId: 6,
      dropwdownValue: "Misc",
    },
  ];
  const handleResetFilters = () => {
    setCategoryValue("");
    setInputValue("");
    router.push("?");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCategory = (value: string) => {
    console.log(value);
    setCategoryValue(value);
  };
  return (
    <>
      <div className="bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40 h-44 rounded-lg flex flex-col justify-center items-start border border-white/10">
        <div className="flex p-4 w-full">
          <h1 className="text-xl whitespace-nowrap dark:text-mikadoYellow mr-4 my-2">
            Filter & Search
          </h1>
          <div className="w-full">
            <InputGroup className="h-12 dark:border dark:border-yaleBlue ">
              <InputGroupInput
                placeholder="Search..."
                value={inputValue}
                onChange={handleChange}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                {resultAmount} results
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="flex items-center ">
            {(categoryValue || inputValue) && (
              <Button
                onClick={() => handleResetFilters()}
                className="mx-2 dark:bg-richBlack text-white border dark:border-mikadoYellow cursor-pointer dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue"
              >
                Reset Filter
              </Button>
            )}
          </div>
        </div>
        <div className="m-4">
          <InputGroup className="dark:border-yaleBlue">
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="m-2">
                  <InputGroupButton className="">
                    <p className="dark:text-mikadoYellow">
                      {!categoryValue ? "Categories" : categoryValue}
                    </p>
                    <ChevronDown />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-oxfordBlue dark:text-gold"
                  align="end"
                >
                  {dropwdownValues.map((item) => (
                    <DropdownMenuItem
                      key={item.dropdownId}
                      className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow"
                      onSelect={() => handleCategory(item.dropwdownValue)}
                    >
                      {item.dropwdownValue}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
            <InputGroupAddon>
              <Tag />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </>
  );
};

export default TransactionSearch;
