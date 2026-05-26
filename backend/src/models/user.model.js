const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password:{
            type: String,
            required: true,
        },

        role:{
            type: String,
            enum: ["CANDIDATE", "COMPANY", "ADMIN"],
            required: true,
        },

        isVerified: {
        type: Boolean,
        default: false,
        },

        authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
        },
    },
    {
        timestamps: true,
    }

);

const User = mongoose.model("User", userSchema);

module.exports = User;