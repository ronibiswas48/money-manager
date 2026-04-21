import StatementClient from "@/components/dashboard/statement/StatementClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statement",
  description: "Review and download your financial statements. Get detailed insights into your income and expense reports.",
}

export default function StatementPage() {
    return (
        <main>
            <StatementClient />
        </main>
    )
}