import { CategoryPie } from "@/components/dashboard/analytics/category-pie";
import { MonthlyChart } from "@/components/dashboard/analytics/monthly-chart";

// Note: Real data fetch korar logic ekhane thakbe
const chartData = [
  { name: 'Jan', income: 45000, expense: 32000 },
  { name: 'Feb', income: 52000, expense: 38000 },
  { name: 'Mar', income: 48000, expense: 41000 },
  { name: 'Apr', income: 61000, expense: 35000 },
];

const categoryData = [
  { name: 'Food', value: 4500 },
  { name: 'Medicine', value: 2000 },
  { name: 'Family', value: 8000 },
  { name: 'Savings', value: 5000 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Financial Analytics</h1>
      
      <div className="grid grid-cols-4 gap-6">
        {/* Main Flow Chart */}
        <MonthlyChart data={chartData} />
        
        {/* Category Breakdown */}
        <CategoryPie data={categoryData} />
      </div>
    </div>
  );
}