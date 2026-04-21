"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Loader2, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function StatementPage() {
    const [dailyData, setDailyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const { data: session } = useSession();

    if(!session) redirect('/auth')

    useEffect(() => {
        setMounted(true);
        fetchStatement(); // Initial load for "All"
    }, []);

    const fetchStatement = async (days?: number) => {
        setLoading(true);
        try {
            let url = `/api/statement`;
            if (days) {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - days);
                url += `?startDate=${start.toISOString()}&endDate=${end.toISOString()}`;
                setDateRange({ start: start.toLocaleDateString('en-GB'), end: end.toLocaleDateString('en-GB') });
                setActiveFilter(days === 30 ? "1 Month" : "3 Months");
            } else {
                setActiveFilter("all");
                setDateRange({ start: "Beginning", end: "Today" });
            }

            const res = await fetch(url);
            const data = await res.json();

            // ADVANCED DAILY GROUPING LOGIC
            const groups: any = {};
            data.forEach((t: any) => {
                const date = new Date(t.date).toLocaleDateString('en-GB');
                if (!groups[date]) {
                    groups[date] = { date, income: 0, cost: 0, withdraw: 0 };
                }

                const amt = Math.abs(Number(t.amount));

                // ১. Income calculation
                if (t.category === "income") {
                    groups[date].income += amt;
                }
                // ২. Withdraw calculation (Type check)
                else if (t.type === "withdraw") {
                    groups[date].withdraw += amt;
                }
                // ৩. Everything else is Cost (Personal, Medicine, etc.)
                else {
                    groups[date].cost += amt;
                }
            });

            setDailyData(Object.values(groups));
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };




    const downloadPDF = () => {
        if (activeFilter === "all") {
            return toast.error("Please select 1 Month or 3 Months statement.");
        }

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const userName = session?.user?.name || "User Name";
        const userEmail = session?.user?.email || "user@email.com";

        // 1. HEADER SECTION (User Info & Title)
        doc.setFontSize(20);
        doc.setTextColor(30, 41, 59); // Slate-800
        doc.text("Life Easy - Statement", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Name: ${userName}`, 14, 28);
        doc.text(`Email: ${userEmail}`, 14, 33);

        // Right Side Header (Period)
        doc.text(`Period: ${dateRange.start} - ${dateRange.end}`, pageWidth - 14, 28, { align: 'right' });
        doc.text(`Type: ${activeFilter}`, pageWidth - 14, 33, { align: 'right' });

        // Divider Line
        doc.setDrawColor(200);
        doc.line(14, 38, pageWidth - 14, 38);

        // 2. DATA CALCULATION FOR FOOTER
        let totalIncome = 0;
        let totalCost = 0;
        let totalWithdraw = 0;

        const tableRows = dailyData.map(day => {
            totalIncome += day.income;
            totalCost += day.cost;
            totalWithdraw += day.withdraw;
            return [
                day.date,
                `${day.income.toLocaleString()}`,
                `${day.cost.toLocaleString()}`,
                `${day.withdraw.toLocaleString()}`,
                `${(day.income - day.cost).toLocaleString()}`
            ];
        });

        // 3. TABLE GENERATION (Auto-paging included)
        autoTable(doc, {
            startY: 45,
            head: [['Date', 'Income', 'Costs', 'Withdrawals', 'Net Balance']],
            body: tableRows,
            foot: [[
                'TOTAL SUMMARY',
                `${totalIncome.toLocaleString()}`,
                `${totalCost.toLocaleString()}`,
                `${totalWithdraw.toLocaleString()}`,
                `${(totalIncome - totalCost).toLocaleString()}`
            ]],
            margin: { left: 14, right: 14, bottom: 20 },
            styles: { fontSize: 9, cellPadding: 3 },
            headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
            footStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold' },
            theme: 'grid',
            tableWidth: 'auto', // Table puro width nibe

            // Multi-page logic handle korar jonno footer
            didDrawPage: (data) => {
                doc.setFontSize(8);
                doc.setTextColor(150);

                // Left Side Footer
                doc.text(`Generated by Roni Biswas | ${new Date().toLocaleDateString()}`, 14, pageHeight - 10);

                // Right Side Pagination
                const str = "Page " + doc.getNumberOfPages();
                doc.text(str, pageWidth - 25, pageHeight - 10);

                // GitHub Link at bottom center
                doc.setTextColor(0, 0, 255);
                doc.text("github.com/roni-biswas", pageWidth / 2, pageHeight - 10, { align: 'center' });
            }
        });

        // 4. SAVE FILE
        doc.save(`Statement_${activeFilter.replace(/\s+/g, '_')}.pdf`);
    };

    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-3xl font-bold">Statement</h1>
                <div className="flex gap-2">
                    <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => fetchStatement()}>All</Button>
                    <Button variant={activeFilter === "1 Month" ? "default" : "outline"} onClick={() => fetchStatement(30)}>1 Month</Button>
                    <Button variant={activeFilter === "3 Months" ? "default" : "outline"} onClick={() => fetchStatement(90)}>3 Months</Button>

                    <Button
                        onClick={downloadPDF}
                        disabled={activeFilter === "all"}
                        className={`${activeFilter === 'all' ? 'bg-slate-300' : 'bg-blue-600'}`}
                    >
                        <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Daily Income</TableHead>
                                <TableHead>All Costs</TableHead>
                                <TableHead>Withdrawals</TableHead>
                                <TableHead className="text-right">Daily Profit/Loss</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5} className="text-center py-20"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
                            ) : dailyData.map((day, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{day.date}</TableCell>
                                    <TableCell className="text-green-600">+৳{day.income}</TableCell>
                                    <TableCell className="text-red-500">-৳{day.cost}</TableCell>
                                    <TableCell className="text-orange-500">৳{day.withdraw}</TableCell>
                                    <TableCell className={`text-right font-bold ${day.income - day.cost >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                        ৳{day.income - day.cost}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {activeFilter === "all" && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    PDF download is disabled for 'All' data to prevent server load. Please select 1 or 3 months.
                </div>
            )}
        </div>
    );
}