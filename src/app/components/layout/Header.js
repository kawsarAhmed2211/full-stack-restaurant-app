"use client";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export default function Header() {
    const session = useSession();
    console.log(session);
    const status = session .status;
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
                        <button
                            onClick={() => signOut()}
                            className="bg-red-600 rounded-full text-white px-8 py-2">Logout</button>

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