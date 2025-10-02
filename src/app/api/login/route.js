import { NextResponse } from 'next/server';
import mongoose from "mongoose";

export async function POST(request) {
    mongoose.connect(process.env.MONGODB_URI);
    const body = await request.json();
    const { email, password } = body;

    // Add your login logic here
    return NextResponse.json({ message: 'Login successful', body });
}
