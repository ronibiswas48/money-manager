import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, ShieldCheck, Sparkles } from "lucide-react";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/user");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <main className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium animate-fade-in">
          <Sparkles className="h-4 w-4" />
          <span>New: Advanced Financial Analytics</span>
        </div>

        {/* Hero Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
            Life <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Easy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate companion for your personal finances. Track every transaction, analyze your spending habits, and reach your savings goals with a seamless, modern interface.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-200 dark:shadow-none">
            <Link href="/auth" className="flex items-center gap-2">
              Start for Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-8 pt-16 border-t border-slate-100 dark:border-zinc-900">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">Secure & Private</p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="p-2 bg-slate-50 dark:bg-zinc-900 rounded-lg">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">Easy Tracking</p>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 w-full text-center text-slate-400 dark:text-zinc-600 text-xs tracking-widest uppercase">
        Developed by devroni System
      </footer>
    </div>
  );
}
