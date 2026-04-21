import AnalyticsClient from "@/components/dashboard/analytics/AnalyticsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Detailed insights into your spending and income habits.",
}

export default function AnalyticsPage() {

  return (
    <main>
      <AnalyticsClient />
    </main>
  )
    
}
