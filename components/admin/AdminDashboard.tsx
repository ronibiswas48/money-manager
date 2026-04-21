"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

interface UserSummary {
  _id: string;
  name: string;
  email: string;
  role: string;
  totalIncome: number;
  totalCost: number;
  totalSavings: number;
  netBalance: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserSummary[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (Array.isArray(data)) setUsers(data)
    } catch (err) {
      toast.error("Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      toast.success("Updated")
      fetchUsers()
    }
  }

  if (loading) return <div className="p-10 text-center animate-pulse">Loading Summary...</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="border rounded-xl bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-zinc-900">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Income</TableHead>
              <TableHead className="text-right">Today's Cost</TableHead>
              <TableHead className="text-right">Savings</TableHead>
              <TableHead className="text-right font-bold border-l">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </TableCell>
                <TableCell>
                  <Select defaultValue={user.role} onValueChange={(val) => handleRoleChange(user._id, val)}>
                    <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right text-green-600">৳{user.totalIncome || 0}</TableCell>
                <TableCell className="text-right text-red-500">৳{user.totalCost || 0}</TableCell>
                <TableCell className="text-right text-blue-600">৳{user.totalSavings || 0}</TableCell>
                <TableCell className="text-right font-bold border-l bg-slate-50/50">
                  <span className={user.netBalance >= 0 ? "text-green-700" : "text-red-600"}>
                    ৳{user.netBalance || 0}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}