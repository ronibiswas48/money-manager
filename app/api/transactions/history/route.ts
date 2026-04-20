import { dbConnect } from "@/database/db";
import { authOptions } from "@/lib/auth";
import { Transaction } from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try {
        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json(
            { message: "Unauthorized"},
            { status: 401}
        )

        const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // connect to database
    await dbConnect();

    let query: any = {
        userId: (session.user as any).id,
        type: { $ne: "withdraw" }
    };

    // Category Filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Date Range Filter
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    return NextResponse.json(transactions);

    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching history'},
            { status: 500}
        )
    }
}