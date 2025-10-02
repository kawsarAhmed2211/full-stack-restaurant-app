// src/app/api/auth/register/page.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User";

export async function POST(req) {
    try {
        const body = await req.json(); // ✅ get body
        //console.log("The body in json format is: ", body);

        await mongoose.connect(process.env.MONGODB_URI);

        const createdUser = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            image: body.image || "/default_picture.png", // fallback default
        });

        //console.log("Here is user: ", createdUser);
        return NextResponse.json({ createdUser });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

{/*
If you previously had a schema without name and image, and your app hot-reloaded, mongoose.models.User might be using the old model.

Because you do this:

const User = mongoose.models.User || mongoose.model("User", UserSchema);


mongoose.models.User could be the old schema without name and image.

This is very common in Next.js when you change the schema but keep the server running.

Solution:

Stop the dev server completely and restart it. Then try registering a new user.
*/}