import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type confirmation = {
  showAlert: boolean;
  setAlert: () => void;
  deleteTransaction: () => void;
};
const DeleteConfirmation = ({
  showAlert,
  setAlert,
  deleteTransaction,
}: confirmation) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <AlertDialog open={showAlert}>
          <AlertDialogContent className="dark:bg-richBlack ">
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-gold text-yaleBlue">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="">
                This action cannot be undone. This will permanently delete your
                transaction and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="cursor-pointer"
                onClick={() => setAlert()}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-mikadoYellow text-yaleBlue hover:bg-gold"
                onClick={() => {
                  deleteTransaction();
                  setAlert();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default DeleteConfirmation;
