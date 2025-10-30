import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { downloadImage, viewReceipt } from "@/utilities/utilityFuncs";

interface transaction {
  transaction: DetailedTransaction;
}
const TransactionDetailHeader = ({ transaction }: transaction) => {
  const time = new Date(transaction.PurchaseDate).toString();

  const getReceiptDownload = async (imageReceiptUrl: string) => {
    const imageUrl = await viewReceipt(imageReceiptUrl);
    const download = await downloadImage(imageUrl.url);
  };

  return (
    <>
      <div className="dark:bg-oxfordBlue border dark:border-yaleBlue h-80 rounded-lg">
        <div>
          <div className="m-7">
            <h1 className="text-white font-bold text-3xl tracking-normal ">
              {transaction.Vendor}
            </h1>
            <p className="my-2 text-slate-500">{time}</p>
          </div>
          <div className="m-7 flex flex-col text-right">
            <p className="float-end text-slate-500">Total Amount</p>
            <h2 className="text-4xl text-mikadoYellow font-bold float-end">
              {transaction.Amount.toLocaleString("en-US")}
            </h2>
          </div>
          <div className="m-7 border border-yaleBlue"></div>
          <div className="m-7 grid grid-cols-3  gap-4 sm:flex">
            {transaction.ImagePath && (
              <Button
                className="flex-1 max-w-40 cursor-pointer dark:bg-mikadoYellow dark:hover:bg-gold dark:text-yaleBlue mr-2   "
                onClick={() =>
                  getReceiptDownload(transaction.ImagePath as string)
                }
              >
                Download Receipt
              </Button>
            )}
            <Button className="flex-1 max-w-40 cursor-pointer dark:bg-yaleBlue dark:hover:bg-oxfordBlue dark:text-slate-300 dark:hover:text-mikadoYellow mr-2 border border-yaleBlue ">
              <Pencil />
              Edit
            </Button>
            <Button className="flex-1 max-w-40 cursor-pointer dark:bg-yaleBlue dark:hover:bg-oxfordBlue dark:text-slate-300 dark:hover:text-red-600 dark:border dark:border-yaleBlue">
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailHeader;
