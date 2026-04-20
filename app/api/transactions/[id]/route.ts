import { dbConnect } from "@/database/db";
import { authOptions } from "@/lib/auth";
import { transactionSchema } from "@/lib/validations";
import { Transaction } from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        // connect to database
        await dbConnect();

        const { id } = await params;
        // user data delete only transaction matching
        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: id,
            userId: (session.user as any).id,
        });

        if (!deletedTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting" }, { status: 500 });
    }
}

// transaction edit api
// app/api/transactions/[id]/route.ts

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const {id} = await params;

        // validation server
        const validation = transactionSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.message },
                { status: 400 }
            )
        }
        const { title, amount, category } = validation.data;

        await dbConnect();

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: id, userId: (session.user as any).id },
            { title, amount, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}