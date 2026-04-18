import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('Mongodb successfully connected!')
    } catch (error) {
        const err = error as Error;
        console.log('Mongodb not Connected - ', err.message)
    }
}