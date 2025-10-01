import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { budgetTable } from "@/schema/budgetSchema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Loader2Icon, Tag, X } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface budgetFormProps {
  onClose: () => void;
}

const BudgetForm = ({ onClose }: budgetFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof budgetTable>) => {
      const transformData = {
        ...data,
        Amount: Number(data.Amount),
      };

      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      form.reset();
      onClose();
      toast.success("Budget created");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const isLoading = mutation.isPending;

  const handleSubmit = async (data: z.infer<typeof budgetTable>) => {
    console.log("clicked");
    mutation.mutate(data);
  };
  const form = useForm<z.infer<typeof budgetTable>>({
    resolver: zodResolver(budgetTable),
    defaultValues: {
      Amount: 0,
      BudgetName: "",
    },
  });

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ">
        <Card className="w-full max-w-md border-0 shadow-2xl dark:bg-richBlack backdrop-blur-sm">
          <CardHeader className="relative">
            <div className="absolute -inset-1  rounded-lg blur opacity-25"></div>
            <div className="relative">
              <CardTitle className="text-xl font-serif flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-richBlack to-oxfordBlue rounded-lg">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                Add Budget
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 h-8 w-8 p-0 cursor-pointer"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="BudgetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Budget Name" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Amount"
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value || ""}
                        />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Tag className="h-4 w-4 text-mikadoYellow" />
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Transportation">
                            Transportation
                          </SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Salary">Salary</SelectItem>
                          <SelectItem value="Fixed Expense">
                            Fixed Expense
                          </SelectItem>
                          <SelectItem value="Misc">Misc</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="flex justify-center"> */}
                <Button
                  className="cursor-pointer mx-2 "
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer mx-2 bg-mikadoYellow hover:bg-gold text-oxfordBlue"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                      Please wait...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
                {/* </div> */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BudgetForm;
