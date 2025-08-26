"use client";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export default function Header() {
    const session = useSession();
    console.log("Session from  headerL",session);
    const status = session?.status;
    console.log("Status header",status);
    const userData = session.data?.user;
    console.log("UserData header",userData);
    let userName = userData?.name || userData?.email;

    return (
        <>
            {/* justify between is used to seperate distance from logo to navlinks */}
            <header className="flex justify-between border">
                <Link className="text-red-600 font-bold text-2xl" href="">ST PIZZA</Link>

                <nav className="flex gap-8  items-center ">
                    <Link href="/">Home</Link>
                    <Link href="/menu">Menu</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </nav>

                <nav className="flex gap-4 items-center">
                    {status === "authenticated" && (
                        <>
                        <Link href="/profile" className="whitespace-nowrap"><br/>{userName}</Link>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-600 rounded-full text-white px-8 py-2">Logout
                        </button>
                        </>
                    )}
                    {status === "unauthenticated" && (
                        <>
                            <Link href={"/login"} className="bg-red-600 text-white px-6 py-2 rounded-full">Login</Link>
                            <Link href={"/register"}>Register</Link>
                        </>
                    )}
                    {/*
            * the link must be same as the folder name i.e, it only works because the folder name is register if it was Register it would not*/}
                </nav>
            </header>
        </>
    );
}

{/*

Good question 👍

The difference between session.data?.user and session.data.user is the optional chaining operator (?.).

🔑 What it means:

session.data.user → will throw an error if session.data is undefined or null.
Example:

const userData = session.data.user;
// ❌ If session.data is undefined → TypeError: Cannot read properties of undefined


session.data?.user → will safely return undefined if session.data doesn’t exist.
Example:

const userData = session.data?.user;
// ✅ If session.data is undefined → userData becomes undefined (no crash)

✅ Why it’s important in NextAuth:

When useSession() first runs, session.data might be undefined while it’s still loading.

Without ?., your app could crash trying to access session.data.user.

With ?., your app won’t crash — it will just wait until the session is ready.

👉 So in short:

Use session.data?.user → safe way (recommended).

Use session.data.user → only if you’re 100% sure session.data is always defined.

Do you want me to show you how you can use this to conditionally display the user’s email/name in your header safely?
*/}