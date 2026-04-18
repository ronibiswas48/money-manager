import { dbConnect } from "@/database/db"
import { registerSchema } from "@/lib/validations"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        // db connect
        await dbConnect()

        // gate data from body
        const body = await req.json()

        // server-side validation
        const validation = registerSchema.safeParse(body)
        if(!validation.success) {
            return NextResponse.json(
                {message: validation.error.message},
                {status: 400}
            )
        }
        const {name, email, password} = validation.data;

        // check user already exists or not in database
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json(
                { message: "This email is already registered"},
                {status: 400}
            )
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        // save user data in database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json(
            { 
                message: "User registered successfully",
                userId: newUser._id
            },
            {status: 201}
        )
    } catch (err) {
        console.error("Registration Error", err)
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}