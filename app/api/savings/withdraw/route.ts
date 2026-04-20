import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/database/db";
import { Transaction } from "@/models/Transaction";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, description } = await req.json();
    const withdrawalAmount = Number(amount);

    // Withdraw mane savings theke taka ber kora, tai amount-ti negative (-) hobe
    await Transaction.create({
      userId: session.user.id,
      amount: -Math.abs(withdrawalAmount), // Negative amount
      title: description || "Savings Withdrawal",
      category: "savings",
      date: new Date(),
      type: "withdraw"
    });

    return NextResponse.json({ message: "Withdrawal successful" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}