"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

export function MonthlyChart({ data }: { data: any[] }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // SSR mismatch bondho korar jonno placeholder
    if (!isMounted) {
        return (
            <Card className="col-span-4 lg:col-span-3">
                <div className="h-[400px] w-full animate-pulse bg-muted/20 rounded-lg" />
            </Card>
        )
    }

    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Cash Flow Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                {/* 1. Wrapper div-er height nishchit kora (h-80 = 320px) */}
                <div className="h-80 w-full min-w-0">
                    {/* 2. minWidth={0} add kora hoyeche jate error na dey */}
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <AreaChart 
                            data={data}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Left margin negative jate axis line ghise thake
                        >
                            <defs>
                                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            
                            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                            
                            <XAxis 
                                dataKey="name" 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                                dy={10} // Text-ke arektu niche namanor jonno
                            />
                            
                            <YAxis 
                                stroke="#888888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(value) => `৳${value}`}
                                dx={-5}
                            />
                            
                            <Tooltip 
                                cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                                contentStyle={{ 
                                    backgroundColor: "#fff", 
                                    borderRadius: "12px", 
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                                }}
                            />
                            
                            <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                            
                            <Area 
                                name="Income"
                                type="monotone" 
                                dataKey="income" 
                                stroke="#22c55e" 
                                fillOpacity={1} 
                                fill="url(#incomeGradient)" 
                                strokeWidth={2}
                                animationDuration={1500}
                            />
                            
                            <Area 
                                name="Expense"
                                type="monotone" 
                                dataKey="expense" 
                                stroke="#ef4444" 
                                fillOpacity={1} 
                                fill="url(#expenseGradient)" 
                                strokeWidth={2}
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}