import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    image: {type: String, default: "/default_picture.png"},
    // streetAddress: { type: String },
    // postalCode: { type: String },
    // city: { type: String },
    // country: { type: String },
    // phone: { type: String },
}, { timestamps: true });  // 👈 this adds createdAt & updatedAt automatically

export const User = mongoose.models.User || mongoose.model("User", UserSchema);


