"use client"

import { useState, useEffect } from "react";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const res = await fetch(`/api/transactions/history?category=${category}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    fetchHistory();
  }, [category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Transaction History</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
          
          {/* <Input type="date" className="w-37.5" /> */}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border rounded-xl p-4 shadow-sm">
        {loading ? (
          <p className="text-center py-10">Loading history...</p>
        ) : (
          <RecentTransactions data={data} />
        )}
      </div>
    </div>
  );
}