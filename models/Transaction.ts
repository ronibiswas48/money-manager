import mongoose, { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['income', 'personal', 'medicine', 'family', 'savings'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["deposit", "withdraw"],
        default: "deposit"
    },
}, { timestamps: true })

export const Transaction = models.Transaction || model('Transaction', TransactionSchema) 