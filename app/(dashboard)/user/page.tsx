import { AddTransactionForm } from "@/components/dashboard/add-transaction-form";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
// import { RecentTransactions } from "@/components/dashboard/recent-transactions";
// import { AddTransactionForm } from "@/components/dashboard/add-transaction-form";

const data = [
  {
    "_id": "642a1b2c3d4e5f6g7h8i9j01",
    "title": "Monthly Salary",
    "amount": 25000,
    "category": "income",
    "date": "2026-04-19T08:00:00.000Z"
  },
  {
    "_id": "642a1b2c3d4e5f6g7h8i9j02",
    "title": "Napa Extend & Gastric Tab",
    "amount": 450,
    "category": "medicine",
    "date": "2026-04-19T10:30:00.000Z"
  },
  {
    "_id": "642a1b2c3d4e5f6g7h8i9j03",
    "title": "Emergency Fund Savings",
    "amount": 5000,
    "category": "savings",
    "date": "2026-04-19T11:00:00.000Z"
  }
]

export default async function UserHomePage() {
  // Logic: Fetch today's data from database
  const todaySummary = { income: 5000, cost: 1200, balance: 3800 };

  return (
    <div className="space-y-6">
      {/* 1. Header Cards */}
      <SummaryCards 
        income={todaySummary.income} 
        cost={todaySummary.cost} 
        balance={todaySummary.balance} 
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* 2. Quick Add Section (Span 3 for layout) */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Entry</h2>
            <AddTransactionForm />
          </div>
        </div>

        {/* 3. Recent History (Span 4 for layout) */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today's History</h2>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            <RecentTransactions data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
