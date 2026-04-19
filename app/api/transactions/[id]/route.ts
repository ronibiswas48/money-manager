import { dbConnect } from "@/database/db";
import { authOptions } from "@/lib/auth";
import { Transaction } from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        // connect to database
        await dbConnect();

        const {id} = await params;
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