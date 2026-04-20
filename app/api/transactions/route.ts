import { dbConnect } from "@/database/db";
import { authOptions } from "@/lib/auth";
import { transactionSchema } from "@/lib/validations";
import { Transaction } from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// save for new transaction
export async function POST(req: Request) {
    try {
        // check user are logged in
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        // connect to database
        await dbConnect()

        // get data from body
        const body = await req.json()

        // server-side validation
        const validation = transactionSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.message },
                { status: 400 }
            )
        }

        const {title, amount, category} = validation.data;
        // add new transaction
        const newTransaction = await Transaction.create({
            title,
            amount,
            category,
            date: new Date(),
            userId: (session.user as any).id,
            type: 'deposit'
        })
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Transaction added Failed!" },
            { status: 500 }
        )
    }
}