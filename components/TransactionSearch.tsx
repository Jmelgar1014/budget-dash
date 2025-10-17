import React from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

import CategoryDropdown from "./CategoryDropdown";

interface filterTransactions {
  setInputValue: (value: string) => void;
  inputValue: string;
  resultAmount: number;
}

const TransactionSearch = ({
  setInputValue,
  inputValue,
  resultAmount,
}: filterTransactions) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <div className="dark:bg-oxfordBlue h-44 rounded-lg flex flex-col justify-center items-start border border-yaleBlue">
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
        </div>
        <CategoryDropdown />
      </div>
    </>
  );
};

export default TransactionSearch;
