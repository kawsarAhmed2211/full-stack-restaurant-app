import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });  // 👈 this adds createdAt & updatedAt automatically

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
