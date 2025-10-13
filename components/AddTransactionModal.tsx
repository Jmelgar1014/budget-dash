"use client";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon, ReceiptText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, DollarSign, Tag } from "lucide-react";
import { transactionType } from "@/schema/TransactionSchema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface AddTransactionModalProps {
  onClose: () => void;
}

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof transactionType>) => {
      const transformData = {
        ...data,
        PurchaseDate: data.PurchaseDate.getTime(),
      };
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-type": "application/json" },

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
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      form.reset();
      onClose();
      toast.success("Transaction has been added");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const isLoading = mutation.isPending;

  const form = useForm<z.infer<typeof transactionType>>({
    resolver: zodResolver(transactionType),
    defaultValues: {
      Vendor: "",
      PurchaseType: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof transactionType>) => {
    try {
      const file = data.ImagePath;

      let s3Url = null;

      if (file) {
        const userId = "testing";
        const fileName = "testing122119";

        const urlResponse = await fetch("/api/upload/getsignedurl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            fileName: fileName,
            fileType: file.type,
          }),
        });

        if (!urlResponse.ok) {
          throw new Error("Fialed to get upload url");
        }

        const { uploadUrl, fileUrl } = await urlResponse.json();

        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }
        s3Url = fileUrl;
      }

      // const transactionData = { ...data, ImagePath: s3Url || null };

      // mutation.mutate(transactionData);

      mutation.mutate({
        Vendor: data.Vendor,
        Amount: data.Amount,
        Category: data.Category,
        Description: data.Description,
        PurchaseDate: data.PurchaseDate,
        PurchaseType: data.PurchaseType,
        ImagePath: s3Url || undefined,
      } as z.infer<typeof transactionType>);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md border-0 shadow-2xl dark:bg-richBlack backdrop-blur-sm">
        <CardHeader className="relative">
          <div className="absolute -inset-1  rounded-lg blur opacity-25"></div>
          <div className="relative">
            <CardTitle className="text-xl font-serif flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-richBlack to-oxfordBlue rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <p className="">Add Transaction</p>
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="PurchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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
              <FormField
                control={form.control}
                name="ImagePath"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      <ReceiptText className="h-4 w-4 text-mikadoYellow" />
                      Receipt
                    </FormLabel>
                    <Input
                      type="file"
                      id="receipt"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                    />
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
