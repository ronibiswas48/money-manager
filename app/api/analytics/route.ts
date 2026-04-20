import { dbConnect } from "@/database/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Aggregation for Monthly Data (Income vs Expense)
    const monthlyStats = await Transaction.aggregate([
      {
        $group: {
          _id: { 
            month: { $month: { $toDate: "$date" } }, 
            year: { $year: { $toDate: "$date" } } 
          },
          income: {
            $sum: {
              $cond: [
                { $eq: ["$category", "income"] },
                { $convert: { input: "$amount", to: "double", onError: 0 } },
                0
              ]
            }
          },
          expense: {
            $sum: {
              $cond: [
                { $ne: ["$category", "income"] },
                { $convert: { input: "$amount", to: "double", onError: 0 } },
                0
              ]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Aggregation for Category Breakdown (Only Expenses)
    const categoryStats = await Transaction.aggregate([
      { $match: { category: { $ne: "income" } } },
      {
        $group: {
          _id: "$category",
          total: { 
            $sum: { $convert: { input: "$amount", to: "double", onError: 0 } } 
          }
        }
      }
    ]);

    // Format Monthly Data for Recharts
    const chartData = monthlyStats.map(stat => ({
      name: new Date(2000, stat._id.month - 1).toLocaleString('default', { month: 'short' }),
      income: stat.income,
      expense: stat.expense,
    }));

    // Format Pie Data for Recharts
    const pieData = categoryStats.map(cat => ({
      name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1),
      value: cat.total
    }));

    return NextResponse.json({ chartData, pieData });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}