import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost, MoveLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 bg-slate-50">
      <Ghost className="h-20 w-20 text-slate-300 animate-bounce" />
      <h2 className="text-4xl font-black text-slate-800">404</h2>
      <p className="text-slate-500">Sorry, Page Not Found</p>
      <Button asChild variant="link" className="text-blue-600">
        <Link href="/user" className="flex items-center gap-2">
          <MoveLeft className="h-4 w-4" /> Go to Dashboard</Link>
      </Button>
    </div>
  )
}