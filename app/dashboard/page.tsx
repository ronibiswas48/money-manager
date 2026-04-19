import { Card } from "@/components/ui/card";

export default function UserDashboard() {
  // Logic: 
  // 1. Total Savings = Sum(category: 'savings') - Sum(category: 'withdraw')
  // 2. Today's Balance = Today's Income - Today's Cost
  const totalSavings = 34;
  const todayIncome = 3;
  const remaining = 39;
  const todayCost = 9;
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats - Realtime Calculation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600 text-white p-4">
          <h3 className="text-sm">Total Savings (Current)</h3>
          <p className="text-2xl font-bold">৳{totalSavings}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm text-zinc-500">Today's Income</h3>
          <p className="text-2xl font-bold text-green-600">৳{todayIncome}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-zinc-500">Today's Total Cost</h3>
          <p className="text-2xl font-bold text-red-600">৳{todayCost}</p>
        </Card>

        <Card className={`p-4 ${remaining < 0 ? 'bg-red-50' : 'bg-zinc-50'}`}>
          <h3 className="text-sm">Remaining (Today)</h3>
          <p className="text-2xl font-bold">৳{remaining}</p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
         {/* <AddTransactionModal /> Ekhane Multiple time add korar button */}
         {/* <WithdrawSavingsModal /> Savings theke taka ber korar button */}
      </div>

      {/* Daily Transaction Table with Update/Delete */}
      <div className="border rounded-lg p-4 bg-white">
        <h2 className="font-semibold mb-4">Today's Activities</h2>
        {/* <TransactionTable 
            data={todayData} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate} 
        /> */}
      </div>
    </div>
  )
}