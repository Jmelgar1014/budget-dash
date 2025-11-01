import { Button } from "../ui/button";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { downloadImage, viewReceipt } from "@/utilities/utilityFuncs";
import { useState } from "react";
import DeleteConfirmation from "../DeleteConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface transaction {
  transaction: DetailedTransaction;
  deletedTransaction: () => void;
}
const TransactionDetailHeader = ({
  transaction,
  deletedTransaction,
}: transaction) => {
  const time = new Date(transaction.PurchaseDate).toDateString();
  const queryClient = useQueryClient();

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const getReceiptDownload = async (imageReceiptUrl: string): Promise<void> => {
    const imageUrl = await viewReceipt(imageReceiptUrl);
    const download = await downloadImage(imageUrl.url);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.json();

      // console.log(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
  const handleDelete = async (id: string, imageUrl: string | undefined) => {
    if (imageUrl) {
      const response = await fetch(
        `/api/receipts/deletereceipt?url=${imageUrl}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log(result);
    }
    deleteMutation.mutate(id);
    toast.success("Transaction has been successfully deleted");
    deletedTransaction();
  };

  return (
    <>
      <div className="dark:bg-oxfordBlue border dark:border-yaleBlue h-80 rounded-lg">
        <div>
          <div className="m-7">
            <h1 className="text-white font-bold text-3xl tracking-normal ">
              {transaction.Vendor}
            </h1>
            <p className="my-2 text-slate-400 flex">
              <Calendar className="mr-3" />
              {time}
            </p>
          </div>

          <div className="m-7 flex flex-col text-right">
            <p className="float-end text-slate-400">Total Amount</p>
            <h2 className="text-4xl text-mikadoYellow font-bold float-end">
              {transaction.Amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
          <div className="m-7 bg-yaleBlue h-0.5 "></div>
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
            <Button
              className="flex-1 max-w-40 cursor-pointer dark:bg-yaleBlue dark:hover:bg-oxfordBlue dark:text-slate-300 dark:hover:text-red-600 dark:border dark:border-yaleBlue"
              onClick={() => {
                setDeleteConfirmation(true);
                setTransactionId(transaction._id);
                setImageUrl(transaction.ImagePath as string);
              }}
            >
              <Trash2 />
              Delete
            </Button>
          </div>
        </div>
      </div>
      {deleteConfirmation && (
        <DeleteConfirmation
          showAlert={deleteConfirmation}
          setAlert={() => setDeleteConfirmation(false)}
          deleteTransaction={() => handleDelete(transactionId, imageUrl)}
        />
      )}
    </>
  );
};

export default TransactionDetailHeader;
