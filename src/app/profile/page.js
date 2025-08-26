"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import {useState} from "react";

export default function ProfilePage() {
    const session = useSession();
    const { status } = session;
    const[userName, setUserName] = useState(session?.data?.user?.name || "");
    console.log("Session from profile", session);



    // function handleProfileInfoUpdate(e){
    //     e.preventDefault();
    //     const response=fetch("/api/profile",{
    //         method: "PUT",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({name: userName}),
    //     })
    // }

    if (status === "loading") {
        return "loading...";
    }
    if (status === "unauthenticated") {
        // ✅ correct value is "unauthenticated", not "unauthorized"
        return redirect("/login");
    }

    const userImage = session.data?.user?.image;
    console.log("X",session.data?.user);

    return (
        <>
            <section>
                <h1>Profile</h1>
                <form className="max-w-xs mx-auto border">
                    <div className="flex gap-4 items-center">
                       <div>
                           <div className="p-2 rounded-lg relative">
                               <Image className="rounded-lg w-full h-full mb-1" src={userImage}
                               width={250} height={250} alt={"avatar"}/>
                               <button type="button"> Edit</button>
                           </div>
                       </div>
                        <div className="grow">
                            <input type={"text"} placeholder={"first and last name"}
                            value={userName}/>
                            <input className="text-white" type={"email"} disabled={true} value={session?.data?.user?.email}/>
                            <button type={"submit"}>Save</button>
                        </div>

                    </div>
                </form>
            </section>
        </>
    );
}

{
    /*
    * why do i had to change th file name to page.js instead of route.js
ChatGPT said:

Good question 👍

In Next.js 13+ with the App Router, the file naming convention is very strict:

page.js → used to define a UI route (a React component that renders when the user visits a path in the browser).

route.js → used to define an API route (server-side functions that handle HTTP requests like GET, POST, etc., but no React components).

Why your case needed page.js

You’re building a profile page component (React UI), not an API handler.
That means /app/profile/page.js is the correct filename.

If you leave it as route.js, Next.js expects it to export HTTP handlers like this:

export async function GET(request) {
  return new Response("Profile API GET endpoint");
}

export async function POST(request) {
  return new Response("Profile API POST endpoint");
}


But since you exported a React component (ProfilePage), Next.js complained:

"No HTTP methods exported in route.js"

✅ Rule of thumb in App Router:

If it’s UI/page for users → page.js

If it’s API endpoint → route.js
    *
    *
    * */
}
