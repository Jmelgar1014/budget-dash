"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
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
import { float32, float64, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, DollarSign, Tag, FileText } from "lucide-react";
import {
  transactionType,
  transactionTableType,
} from "@/schema/TransactionSchema";

interface AddTransactionModalProps {
  onClose: () => void;
}

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const form = useForm<z.infer<typeof transactionType>>({
    resolver: zodResolver(transactionType),
    defaultValues: {
      Vendor: "",
      Amount: 0,
      PurchaseDate: "",
      PurchaseType: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof transactionType>) => {
    const transformData = {
      ...data,
      Amount: Number(data.Amount),
      PurchaseDate: data.PurchaseDate.toString(),
    };

    try {
      const response = await fetch("/api/addtransaction", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(transformData),
      });

      const result = await response.json();

      console.log(result);
      form.reset();
    } catch (error) {
      console.log(error);
    }

    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-25"></div>
          <div className="relative">
            <CardTitle className="text-xl font-serif flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              Add Transaction
            </CardTitle>
            <Button
              variant="ghost"
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
                name="Vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <FormControl>
                      <Input placeholder="Vendor" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="PurchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
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
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Tag className="h-4 w-4 text-purple-500" />
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
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-purple-500" />
                Transaction Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">
                    <span className="text-green-600 font-medium">Income</span>
                  </SelectItem>
                  <SelectItem value="expense">
                    <span className="text-red-600 font-medium">Expense</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-pink-500" />
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">🍕 Food & Dining</SelectItem>
                  <SelectItem value="transport">🚗 Transportation</SelectItem>
                  <SelectItem value="entertainment">
                    🎬 Entertainment
                  </SelectItem>
                  <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                  <SelectItem value="bills">💡 Bills & Utilities</SelectItem>
                  <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                  <SelectItem value="salary">💼 Salary</SelectItem>
                  <SelectItem value="other">📦 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-500" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500" />
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add a note about this transaction..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border-purple-200 focus:border-purple-500 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent cursor-pointer hover:bg-gray-200/60"
              >
                Cancel
              </Button>
              <Button
                onClick={onClose}
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 cursor-pointer"
              >
                Add Transaction
              </Button>
            </div>
          </form> */}
        </CardContent>
      </Card>
    </div>
  );
}
