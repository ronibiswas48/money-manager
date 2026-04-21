import { dbConnect } from "@/database/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { role } = await req.json();
    
    await User.findByIdAndUpdate(params.id, { role });
    
    return NextResponse.json({ message: "Role updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}