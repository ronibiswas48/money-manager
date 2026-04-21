import HistoryClient from "@/components/dashboard/history/HistoryClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "History",
  description: "View and filter your complete transaction history on Life Easy.",
}

export default function HistoryPage() {
  return (
    <main>
      <HistoryClient />
    </main>
  )
}