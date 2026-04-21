'use client'

import { CategoryPie } from "@/components/dashboard/analytics/category-pie";
import { MonthlyChart } from "@/components/dashboard/analytics/monthly-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const {data: session} = useSession()
  if(!session) redirect('/auth')

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error loading analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) return <AnalyticsSkeleton />;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your income and spending patterns.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Area Chart */}
        <MonthlyChart data={data?.chartData || []} />
        
        {/* Category Breakdown Pie Chart */}
        <CategoryPie data={data?.pieData || []} />
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-4 gap-6">
        <Skeleton className="col-span-3 h-112.5" />
        <Skeleton className="col-span-1 h-112.5" />
      </div>
    </div>
  );
}