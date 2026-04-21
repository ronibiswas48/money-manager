import SavingsClient from "@/components/dashboard/savings/SavingsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings",
  description: "Set and track your savings goals. Stay updated with your financial targets and milestones.",
}

export default function SavingsPage() {
 return (
  <main>
    <SavingsClient />
  </main>
 ) 
}