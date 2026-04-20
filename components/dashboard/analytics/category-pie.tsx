"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

const COLORS = ['#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];

export function CategoryPie({ data }: { data: any[] }) {

    const [isMounted, setIsMounted] = useState(false);

    // SSR-er somoy 
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-80 w-full bg-muted/20 animate-pulse rounded-lg" />;
    }

    return (
        <Card className="col-span-4 lg:col-span-1">
            <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}