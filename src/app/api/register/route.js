// src/app/api/auth/register/page.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User";

export async function POST(req) {
    try {
        const body = await req.json(); // ✅ get body
        console.log("The body in json format is: ", body);

        await mongoose.connect(process.env.MONGODB_URI);

        const createdUser = await User.create(body); // ✅ use parsed body
        console.log("Here is user: ", createdUser);

        return NextResponse.json({ createdUser });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}