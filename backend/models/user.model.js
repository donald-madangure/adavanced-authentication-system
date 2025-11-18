import mongoose from "mongoose";

const userSchema = new mongoose.Schema({    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpireAt: Number,
    verificationToken: String,
    verificationTokenExpiresAt: Number,

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
