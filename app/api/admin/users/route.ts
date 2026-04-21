import { dbConnect } from "@/database/db";
import { User } from "@/models/User";
import { Transaction } from "@/models/Transaction"; // Nishchit korun import ache
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    // Force register Transaction model (Next.js hot reload issue fix)
    const transactionModel = mongoose.models.Transaction || Transaction;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usersData = await User.aggregate([
      {
        $lookup: {
          from: "transactions", // MongoDB Compass-e check korun namti 'transactions' kina
          localField: "_id",
          foreignField: "userId",
          as: "allTransactions",
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          // Ajker date onujayi filter
          todaysTransactions: {
            $filter: {
              input: "$allTransactions",
              as: "t",
              cond: { $gte: ["$$t.createdAt", today] }
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          totalIncome: {
            $ifNull: [
              { $sum: { $map: {
                input: { $filter: { input: "$todaysTransactions", as: "t", cond: { $eq: ["$$t.category", "income"] } } },
                as: "item", in: "$item.amount"
              } } },
              0
            ]
          },
          totalCost: {
            $ifNull: [
              { $sum: { $map: {
                input: { $filter: { input: "$todaysTransactions", as: "t", cond: { $and: [
                  { $ne: ["$$t.category", "income"] },
                  { $ne: ["$$t.category", "savings"] },
                  { $ne: ["$$t.type", "withdraw"] }
                ] } } },
                as: "item", in: "$item.amount"
              } } },
              0
            ]
          },
          totalSavings: {
            $ifNull: [
              { $sum: { $map: {
                input: { $filter: { input: "$todaysTransactions", as: "t", cond: { $and: [
                  { $eq: ["$$t.category", "savings"] },
                  { $ne: ["$$t.type", "withdraw"] }
                ] } } },
                as: "item", in: "$item.amount"
              } } },
              0
            ]
          }
        }
      },
      {
        $addFields: {
          netBalance: { $subtract: ["$totalIncome", "$totalCost"] }
        }
      }
    ]);

    return NextResponse.json(usersData);
  } catch (error) {
    console.error("Admin Aggregation Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}