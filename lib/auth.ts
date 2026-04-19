import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/database/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                // check if credentials exist
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // connect to database
                await dbConnect()

                // find user & explicitly select password
                const user = await User.findOne({ email: credentials.email }).select('+password')

                if (!user) {
                    throw new Error("No user found with this email");
                }

                // verify password
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                // return user object
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days 
        updateAge: 24 * 60 * 60,   // everyday session update
    },
    secret: process.env.NEXTAUTH_SECRET,
}