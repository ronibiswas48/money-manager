"use client"

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, ShieldCheck, Calendar, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ProfileClient() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ totalIncome: 0, totalCost: 0 });

    if (!session) redirect('/auth')

    useEffect(() => {
        // Profile-e choto ekti summary dekhate API call
        const fetchStats = async () => {
            const res = await fetch("/api/statement");
            const data = await res.json();
            let income = 0;
            let cost = 0;
            data.forEach((t: any) => {
                if (t.category === "income") income += Math.abs(t.amount);
                else cost += Math.abs(t.amount);
            });
            setStats({ totalIncome: income, totalCost: cost });
        };
        fetchStats();
    }, []);

    if (!session) return <p className="p-10 text-center">Loading Profile...</p>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* 1. Header Profile Card */}
            <Card className="border-none shadow-lg bg-linear-to-r from-slate-900 to-slate-800 text-white">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-slate-700">
                            <AvatarImage src={session.user?.image || ""} />
                            <AvatarFallback className="bg-blue-600 text-2xl font-bold">
                                {session.user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold">{session.user?.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <Badge variant="secondary" className="bg-slate-700 text-white border-none">
                                    <ShieldCheck className="h-3 w-3 mr-1" /> Verified User
                                </Badge>
                                <Badge variant="outline" className="text-slate-300 border-slate-600">
                                    <Calendar className="h-3 w-3 mr-1" /> Joined April 2026
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Information Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-500" /> Personal Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                            <span className="font-medium">{session.user?.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Role</span>
                            <span className="font-medium capitalize">{session.user?.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 flex items-center gap-2"><Wallet className="h-4 w-4" /> Account Type</span>
                            <span className="font-medium">Premium</span>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Quick Stats Card */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-green-500" /> Life-time Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div className="p-4 light:bg-green-50 rounded-lg">
                            <p className="text-xs text-green-600 font-bold uppercase">Total Income</p>
                            <div className="flex items-center text-xl font-bold text-green-700">
                                <ArrowUpRight className="h-4 w-4 mr-1" /> ৳{stats.totalIncome.toLocaleString()}
                            </div>
                        </div>
                        <div className="p-4 light:bg-red-50 rounded-lg">
                            <p className="text-xs text-red-600 font-bold uppercase">Total Spent</p>
                            <div className="flex items-center text-xl font-bold text-red-700">
                                <ArrowDownRight className="h-4 w-4 mr-1" /> ৳{stats.totalCost.toLocaleString()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
