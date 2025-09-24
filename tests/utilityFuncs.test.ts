import { TransactionDetailed } from "@/Types/types";
import {
  getSavingsTotals,
  getTotalBalance,
  getExpensesOnly,
} from "@/utilities/utilityFuncs";

//   Amount: z.number(),
//   Vendor: z.string(),
//   Category: z.string(),
//   Description: z.optional(z.string()),
//   PurchaseDate: z.number(),
//   PurchaseType: z.string(),
//   _creationTime: z.number(),
//   _id: z.string(),
//   AuthId: z.string(),
const testData: TransactionDetailed[] = [
  {
    Amount: 0.5,
    Vendor: "rrr",
    Category: "Transportation",
    Description: "test",
    PurchaseDate: 1757908800000,
    PurchaseType: "Expense",
    CreationTime: 1757871098535.7927,
    Id: "test",
    AuthId: "test",
  },
];

const emptyTest: TransactionDetailed[] = [];

describe("getSavingsTotals", () => {
  it("return 0.00 if there no transactions", () => {
    expect(getSavingsTotals(emptyTest)).toBe("0.00");
  });
  it("should return all savings amount into one amount", () => {
    const testData: TransactionDetailed[] = [
      {
        Amount: 3,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
      {
        Amount: 3,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
    ];
    expect(getSavingsTotals(testData)).toBe("6.00");
  });
  it("return string 0.00 if no savings transactions are provided", () => {
    const testData: TransactionDetailed[] = [
      {
        Amount: 4,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Expense",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
    ];
    expect(getSavingsTotals(testData)).toBe("0.00");
  });
});

describe("getTotalBalance", () => {
  it("should return 0.00 if there are no transactions", () => {
    const test: TransactionDetailed[] = [];
    expect(getTotalBalance(test)).toBe("0.00");
  });
  it("if no income is provided balance should be negative", () => {
    const testData: TransactionDetailed[] = [
      {
        Amount: 3,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
      {
        Amount: 3,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
    ];
    expect(getTotalBalance(testData)).toBe("-6.00");
  });
});
it("if income is higher than expenses balance should be postive and should equal income minues expenses", () => {
  const testData: TransactionDetailed[] = [
    {
      Amount: 3,
      Vendor: "rrr",
      Category: "Transportation",
      Description: "test",
      PurchaseDate: 1757908800000,
      PurchaseType: "Savings",
      CreationTime: 1757871098535.7927,
      Id: "test",
      AuthId: "test",
    },
    {
      Amount: 3,
      Vendor: "rrr",
      Category: "Transportation",
      Description: "test",
      PurchaseDate: 1757908800000,
      PurchaseType: "Savings",
      CreationTime: 1757871098535.7927,
      Id: "test",
      AuthId: "test",
    },
    {
      Amount: 250,
      Vendor: "rrr",
      Category: "Transportation",
      Description: "Income",
      PurchaseDate: 1757908800000,
      PurchaseType: "Income",
      CreationTime: 1757871098535.7927,
      Id: "test",
      AuthId: "test",
    },
  ];
  expect(getTotalBalance(testData)).toBe("244.00");
});

describe("getExpensesOnly", () => {
  it("return 0.00 if there are no transactions", () => {
    expect(getExpensesOnly(emptyTest)).toBe("0.00");
  });
  it("should add only expense items", () => {
    const test: TransactionDetailed[] = [
      {
        Amount: 55,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Expense",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
      {
        Amount: 5,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
      {
        Amount: 350,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Income",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
      {
        Amount: 5,
        Vendor: "rrr",
        Category: "Transportation",
        Description: "test",
        PurchaseDate: 1757908800000,
        PurchaseType: "Savings",
        CreationTime: 1757871098535.7927,
        Id: "test",
        AuthId: "test",
      },
    ];
    expect(getExpensesOnly(test)).toBe("55.00");
  });
});
