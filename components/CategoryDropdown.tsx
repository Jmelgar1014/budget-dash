import { ChevronDown, Tag } from "lucide-react";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "./ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const CategoryDropdown = () => {
  return (
    <div className="m-4">
      <InputGroup className="dark:border-yaleBlue">
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="m-2">
              <InputGroupButton className="">
                <p className="dark:text-mikadoYellow">Categories</p>
                <ChevronDown />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-oxfordBlue dark:text-gold"
              align="end"
            >
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Food
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Transportation
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Utilities
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Salary
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Fixed Expenses
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-yaleBlue dark:hover:text-mikadoYellow">
                Misc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
        <InputGroupAddon>
          <Tag />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default CategoryDropdown;
