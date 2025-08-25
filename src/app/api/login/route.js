import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    // Add your login logic here
    return NextResponse.json({ message: 'Login successful', body });
}
