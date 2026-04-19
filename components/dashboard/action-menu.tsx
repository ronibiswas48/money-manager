"use client"

import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function ActionMenu({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    console.log("Target ID:", id);
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Transaction deleted successfully");
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Edit Button (Optional) */}
      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
        <Pencil className="h-4 w-4" />
      </Button>

      {/* Delete with AlertDialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transaction from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}