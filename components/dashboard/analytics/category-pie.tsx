"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

const COLORS = ['#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];

export function CategoryPie({ data }: { data: any[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-80 w-full bg-muted/20 animate-pulse rounded-lg" />;
    }

    return (
        <Card className="col-span-4 lg:col-span-1">
            <CardHeader>
                <CardTitle className="text-lg">Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {/* 1. Parent div-e fixed height (h-80 = 320px) thaka dorkar */}
                <div className="h-80 w-full">
                    {/* 2. ResponsiveContainer-e minWidth ar minHeight add korun */}
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%" // Center nishchit korun
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                isAnimationActive={true} // Animation refresh error komay
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[index % COLORS.length]} 
                                        stroke="transparent" // Border-er jonno gap jeno na thake
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}