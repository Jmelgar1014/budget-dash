# Testing Recommendations & Edge Cases

## **1. Test Organization Issues**

### **Combining Test Blocks**
Currently you have two separate `describe` blocks for `getTotalBalance`:

```typescript
// Block 1 (line 64)
describe("getTotalBalance", () => {
  it("if no income is provided balance should be negative", () => {
    // test code
  });
});

// Block 2 (line 94) 
describe("getTotalBalance", () => {
  it("if income is higher than expenses balance should be postive", () => {
    // test code
  });
});
```

**Better approach - Combine into one block:**
```typescript
describe("getTotalBalance", () => {
  it("if no income is provided balance should be negative", () => {
    // test code
  });

  it("if income is higher than expenses balance should be positive", () => {
    // test code
  });

  it("should return 0.00 for empty array", () => {
    // additional test
  });
});
```

**Why combine?**
- All tests for the same function are grouped together
- Easier to read and understand the function's behavior
- Better test organization and maintainability

## **2. Missing Edge Cases for `getSavingsTotals`**

### **Current Tests:**
- ✅ Multiple savings transactions
- ✅ No savings in mixed transaction types

### **Missing Edge Cases:**
```typescript
describe("getSavingsTotals", () => {
  it("should return 0.00 for empty array", () => {
    expect(getSavingsTotals([])).toBe("0.00");
  });

  it("should handle decimal amounts correctly", () => {
    const testData = [
      { Amount: 1.99, PurchaseType: "Savings", /* other fields */ },
      { Amount: 0.50, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getSavingsTotals(testData)).toBe("2.49");
  });

  it("should handle zero amount savings", () => {
    const testData = [
      { Amount: 0, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getSavingsTotals(testData)).toBe("0.00");
  });

  it("should handle large numbers", () => {
    const testData = [
      { Amount: 999999.99, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getSavingsTotals(testData)).toBe("999999.99");
  });

  it("should only include Savings, not Income or Expense", () => {
    const testData = [
      { Amount: 100, PurchaseType: "Income", /* other fields */ },
      { Amount: 50, PurchaseType: "Expense", /* other fields */ },
      { Amount: 25, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getSavingsTotals(testData)).toBe("25.00");
  });
});
```

## **3. Missing Edge Cases for `getTotalBalance`**

### **Current Tests:**
- ✅ Negative balance (no income)
- ✅ Positive balance (income > expenses)

### **Missing Edge Cases:**
```typescript
describe("getTotalBalance", () => {
  it("should return 0.00 for empty array", () => {
    expect(getTotalBalance([])).toBe("0.00");
  });

  it("should handle only income transactions", () => {
    const testData = [
      { Amount: 1000, PurchaseType: "Income", /* other fields */ }
    ];
    expect(getTotalBalance(testData)).toBe("1000.00");
  });

  it("should handle only expense transactions", () => {
    const testData = [
      { Amount: 500, PurchaseType: "Expense", /* other fields */ }
    ];
    expect(getTotalBalance(testData)).toBe("-500.00");
  });

  it("should handle decimal precision correctly", () => {
    const testData = [
      { Amount: 100.33, PurchaseType: "Income", /* other fields */ },
      { Amount: 25.67, PurchaseType: "Expense", /* other fields */ },
      { Amount: 10.50, PurchaseType: "Savings", /* other fields */ }
    ];
    // 100.33 - 25.67 - 10.50 = 64.16
    expect(getTotalBalance(testData)).toBe("64.16");
  });

  it("should handle zero amounts", () => {
    const testData = [
      { Amount: 0, PurchaseType: "Income", /* other fields */ },
      { Amount: 0, PurchaseType: "Expense", /* other fields */ }
    ];
    expect(getTotalBalance(testData)).toBe("0.00");
  });

  it("should calculate balance when income equals expenses plus savings", () => {
    const testData = [
      { Amount: 1000, PurchaseType: "Income", /* other fields */ },
      { Amount: 800, PurchaseType: "Expense", /* other fields */ },
      { Amount: 200, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getTotalBalance(testData)).toBe("0.00");
  });
});
```

## **4. Missing Functions to Test**

You imported `getExpensesOnly` but didn't test it. Consider adding:

```typescript
describe("getExpensesOnly", () => {
  it("should return total of only expense transactions", () => {
    const testData = [
      { Amount: 100, PurchaseType: "Income", /* other fields */ },
      { Amount: 50, PurchaseType: "Expense", /* other fields */ },
      { Amount: 25, PurchaseType: "Expense", /* other fields */ },
      { Amount: 10, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getExpensesOnly(testData)).toBe("75.00");
  });

  it("should return 0.00 if no expenses exist", () => {
    const testData = [
      { Amount: 100, PurchaseType: "Income", /* other fields */ },
      { Amount: 10, PurchaseType: "Savings", /* other fields */ }
    ];
    expect(getExpensesOnly(testData)).toBe("0.00");
  });
});
```

## **5. Test Data Improvements**

### **Create Shared Mock Data**
Instead of repeating transaction objects, create reusable mock data:

```typescript
const createMockTransaction = (overrides: Partial<TransactionDetailed> = {}): TransactionDetailed => ({
  Amount: 100,
  Vendor: "Test Vendor",
  Category: "Transportation", 
  Description: "Test transaction",
  PurchaseDate: Date.now(),
  PurchaseType: "Expense",
  CreationTime: Date.now(),
  Id: "test-id",
  AuthId: "test-auth",
  ...overrides
});

// Usage in tests:
const expenseTransaction = createMockTransaction({ Amount: 50, PurchaseType: "Expense" });
const incomeTransaction = createMockTransaction({ Amount: 1000, PurchaseType: "Income" });
```

## **6. Additional Test Scenarios to Consider**

### **Boundary Values**
- Very small decimals: `0.01`
- Very large numbers: `999999.99`
- Exact dollar amounts: `100.00`

### **Data Validation** 
- What happens with negative amounts? (if possible in your system)
- Case sensitivity: `"Savings"` vs `"savings"`
- Unexpected PurchaseType values

### **Real-world Scenarios**
- Mix of all transaction types in realistic proportions
- Common financial amounts: `1500.00` (rent), `4.99` (coffee), `2500.00` (salary)

## **7. Testing Best Practices**

### **Test Names Should Be Descriptive**
- ✅ Good: `"should return 0.00 when no savings transactions exist"`
- ❌ Avoid: `"test savings function"`

### **Test One Thing Per Test**
- Each `it()` block should test one specific behavior
- Easier to debug when tests fail

### **Use Realistic Test Data**
- Instead of `Amount: 3` everywhere, use realistic amounts
- Vary vendor names, categories, dates to catch unexpected issues

### **Consider Testing Error Cases**
- What if required fields are missing?
- What if data types are wrong?

## **8. Future Testing Considerations**

As your app grows, consider testing:
- **Integration tests**: Testing component behavior with real data
- **API endpoint tests**: Testing your Convex functions
- **E2E tests**: Testing complete user workflows
- **Performance tests**: Testing with large datasets (1000+ transactions)

## **Priority Order for Implementation**

1. **High Priority**: Empty array tests, decimal precision tests
2. **Medium Priority**: Zero amount tests, mixed transaction type tests  
3. **Low Priority**: Large number tests, boundary value tests
4. **Future**: Integration and E2E tests

Remember: Good tests not only catch bugs but also serve as documentation for how your functions should behave!