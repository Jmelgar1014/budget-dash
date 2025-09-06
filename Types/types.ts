export type Transaction = {
  Amount: number;
  Vendor: string;
  AuthId: string;
  Category: string;
  Description: string;
  PurchaseDate: number;
  PurchaseType: string;
};

export type TransactionDetailed = {
  Amount: number;
  Vendor: string;
  Category: string;
  Description: string;
  PurchaseDate: number;
  PurchaseType: string;
  CreationTime: number;
  Id: string;
  AuthId: string;
};
