import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Receipt } from "lucide-react";
import { viewReceipt } from "@/utilities/utilityFuncs";
import Image from "next/image";

interface receiptData {
  transactionReceipt: string;
}

const TransactionDetailViewReceipt = ({ transactionReceipt }: receiptData) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const viewImage = async (objectUrl: string | undefined) => {
    const image = await viewReceipt(objectUrl);
    if (showImage) {
      setShowImage(false);
      setImageUrl("");
    } else {
      setShowImage(true);
      setImageUrl(image.url);
    }
  };
  return (
    <>
      <div
        className={`bg-oxfordBlue border border-yaleBlue rounded-lg ${!showImage ? "h-28" : ""}`}
      >
        <div className="m-7">
          <div className="flex justify-between">
            <div className="flex">
              <Receipt className="mr-2" />
              <h1 className="text-2xl font-semibold">Receipt Image</h1>
            </div>

            <Badge
              className="dark:bg-richBlack/50 dark:text-mikadoYellow px-4 font-semibold cursor-pointer dark:hover:text-gold dark:hover:text-shadow-lg dark:hover:shadow-[0_0_15px_rgba(255,195,0,1)]"
              onClick={() => viewImage(transactionReceipt)}
            >
              {showImage ? "Hide" : "Show"}
            </Badge>
          </div>
        </div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Receipt Image"
            height={500}
            width={500}
            className="h-full w-full object-contain p-7  "
          />
        )}
      </div>
    </>
  );
};

export default TransactionDetailViewReceipt;
