"use client"

import { Pencil, Trash2, Pill, Home, Heart, Wallet, Banknote, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const getCategoryDetails = (category: string) => {
  switch (category) {
    case "income":
      return { icon: <Banknote className="h-4 w-4" />, label: "Income", color: "text-green-600 bg-green-50 dark:bg-green-900/20" };
    case "medicine":
      return { icon: <Pill className="h-4 w-4" />, label: "Medicine", color: "text-red-600 bg-red-50 dark:bg-red-900/20" };
    case "family":
      return { icon: <Home className="h-4 w-4" />, label: "Family", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" };
    case "savings":
      return { icon: <Wallet className="h-4 w-4" />, label: "Savings", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" };
    default:
      return { icon: <Heart className="h-4 w-4" />, label: "Personal", color: "text-zinc-600 bg-zinc-50 dark:bg-zinc-800/50" };
  }
}

export function RecentTransactions({ data }: { data: any[] }) {
  return (
    <div className="w-full space-y-2">
      {/* Table Header - Only visible on Desktop */}
      <div className="hidden md:grid grid-cols-4 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border rounded-t-lg font-semibold text-sm">
        <div>Description</div>
        <div>Category</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Action</div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2 md:space-y-0 md:border md:rounded-b-lg overflow-hidden">
        {data.map((item) => {
          const details = getCategoryDetails(item.category);
          return (
            <div 
              key={item._id} 
              className="flex flex-col md:grid md:grid-cols-4 p-4 md:px-4 md:py-3 bg-white dark:bg-zinc-950 border md:border-0 md:border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all rounded-lg md:rounded-none"
            >
              {/* Mobile Layout: Top Row (Title + Action) */}
              <div className="flex justify-between items-start md:block">
                <span className="font-medium text-sm md:text-base line-clamp-1">
                  {item.title}
                </span>
                <div className="md:hidden">
                   <ActionMenu id={item._id} />
                </div>
              </div>

              {/* Category */}
              <div className="mt-2 md:mt-0">
                <div className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${details.color} border-current/10`}>
                  {details.icon}
                  <span>{details.label}</span>
                </div>
              </div>

              {/* Amount */}
              <div className={`mt-1 md:mt-0 md:text-right font-bold text-base ${item.category === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {item.category === 'income' ? '+' : '-'} ৳{item.amount.toLocaleString()}
              </div>

              {/* Desktop Action */}
              <div className="hidden md:flex justify-end">
                <ActionMenu id={item._id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

// Separate Action Menu to keep code clean
function ActionMenu({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className="text-blue-600 cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 cursor-pointer">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}