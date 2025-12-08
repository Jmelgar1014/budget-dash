import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, DollarSign, Loader2Icon, Tag, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { recurringTable } from "@/schema/recurringTransactionSchema";
import { useDemoUser } from "@/hooks/useDemoUser";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
interface RecurringTransaction {
  onClose: () => void;
}

const RecurringTransactionForm = ({ onClose }: RecurringTransaction) => {
  const { isDemoUser } = useDemoUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof recurringTable>) => {
      const transformData = {
        ...data,
        RecurringDate: data.RecurringDate.getTime(),
      };
      const response = await fetch("/api/recurring-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "HTTP Error");
      }
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      onClose();
      toast.success("Recurring Transaction has been added.");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const form = useForm<z.infer<typeof recurringTable>>({
    resolver: zodResolver(recurringTable),
    defaultValues: { Vendor: "", PurchaseType: "" },
  });

  const handleSubmit = async (data: z.infer<typeof recurringTable>) => {
    console.log(data);
    try {
      if (isDemoUser) {
        toast.error(
          "Demo account cannot add transactions. Please create an account."
        );
        return;
      }

      mutation.mutate({
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = mutation.isPending;

  return (
    <>
      <main>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl dark:bg-richBlack dark:border dark:border-white/10 backdrop-blur-sm">
            <CardHeader className="relative">
              <div className="absolute -inset-1  rounded-lg blur opacity-25"></div>
              <div className="relative">
                <CardTitle className="text-xl font-serif flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-richBlack to-oxfordBlue rounded-lg">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <p className="">Add Recurring Transaction</p>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-2 -right-2 h-8 w-8 p-0 cursor-pointer"
                  onClick={onClose}
                >
                  <X className="h-4 w-4 " />
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
                    name="Vendor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor</FormLabel>
                        <FormControl>
                          <Input placeholder="Vendor" {...field} />
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
                        <FormLabel>Category</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="Frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
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
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
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
                        <FormLabel>
                          {" "}
                          <DollarSign className="h-4 w-4 text-green-500" />
                          Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            step="0.01"
                            placeholder="0.00"
                            // pattern="[0-9]+(\.[0-9]{1,2})?"
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ""}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <FormField
                    control={form.control}
                    name="RecurringDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recurring Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date("1900-01-01")
                              // }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="PurchaseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Tag className="h-4 w-4 text-mikadoYellow" />
                          Transaction Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Income">Income</SelectItem>
                            <SelectItem value="Expense">Expense</SelectItem>
                            <SelectItem value="Savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="cursor-pointer m-2"
                    variant="outline"
                    onClick={() => onClose()}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer m-2 bg-mikadoYellow hover:bg-gold text-oxfordBlue"
                    type="submit"
                    disabled={isDemoUser || isLoading}
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
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default RecurringTransactionForm;
