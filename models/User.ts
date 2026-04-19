import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }, 
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

export const User = models.User || model('User', UserSchema)