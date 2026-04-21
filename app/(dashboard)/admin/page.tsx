import AdminDashboard from "@/components/admin/AdminDashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administrative controls and user financial monitoring system.",
}

export default function AdminPage() {
  // In a real app, check if session.user.role === 'admin'
  // If not, redirect('/user')

  return (
    <main className="p-6">
      <AdminDashboard />
    </main>
  )
}