"use client";

import type React from "react";

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
import { X, DollarSign, Calendar, Tag, FileText } from "lucide-react";

interface AddTransactionModalProps {
  onClose: () => void;
}

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Transaction data:", formData);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
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

            {/* Amount */}
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

            {/* Category */}
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

            {/* Date */}
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

            {/* Description */}
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

            {/* Action Buttons */}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
