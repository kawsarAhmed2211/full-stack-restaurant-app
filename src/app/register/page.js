"use client";
import {signIn} from "next-auth/react";
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";


export default function RegisterPage(){
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[image, setImage] = useState("");

    const [userCreated, setUserCreated] = useState(false);
    const[creatingUser, setCreatingUser] = useState(false);
    const[error, setError] = useState(false);

    async function handleFormSubmit(e){
        e.preventDefault();
        /*
        * when you create or register you need to set setError to false
        * because you do not want anything popped in also usercreated needs to be false as well because
        * user is not created yert once done then set ti to yes
        *
        * */
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        /*
        the fetch link has to be the same as the folder directory structure in tnhis it is api/auth/register/
         */
        console.log("handleformsubmit function is running");
        const response = await fetch('api/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password, image}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            setUserCreated(true);
            //user has been created so it has been set to false and user has been created so the latter is set to true
        }
        else{
            setError(true);
            //setError is sset to true because an error now and need sto show it
            const data = await response.json();
            console.log("Server response:", data);
            console.log("successfully registered");
        }
        setCreatingUser(false);
    }

    return(
        <section className="text-center text-4xl text-red-700 mt-15">
            <h1>Register</h1>
            {userCreated && (
                <div className="text-center text-red-700">User successfully created you can do 1 now{" "}
                    Also you can <Link href="/login" className="underline">Login</Link> &raquo;
                </div>
            )}
            {error && (
                <div className="text-center text-red-700">
                        error occured surprise motherfucker
                </div>
            )}
            <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
                <input type={"text"}
                       placeholder="Full Name"
                       value={name}
                       disabled={creatingUser}
                       onChange={(e) => setName(e.target.value)}
                       required/>

                <input type="email"
                       placeholder="Email"
                       value={email}
                       disabled={creatingUser}
                       onChange={(e => setEmail(e.target.value))}
                       required/>

                <input type="password"
                       placeholder="Password"
                       value={password}
                       disabled={creatingUser}
                       onChange={(e => setPassword(e.target.value))}
                       required/>

                <input
                    type="text"
                    placeholder="Profile Image URL (optional)"
                    value={image}
                    disabled={creatingUser}
                    onChange={(e) => setImage(e.target.value)}/>

                <button type ="submit"
                        disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500 text-sm">
                    Or login with provider
                </div>
                <button className="flex gap-4 justify-center ">
                    <Image src="/google.png" alt="Google" width="20" height="30" className="inline-block mr-2" />
                    Login with Google</button>
            </form>

        </section>
    )
}

/*
 * [Error: No response is returned from route handler 'D:\Users\ahmed\Documents\full-st
 * ack-restaurant-web-app\src\app\api\auth\register\page.js'. Ensure you return a `Response` or a `NextResponse` in all branches of your handler.]
 *  POST /api/auth/register 500 in 5807ms
 *
 * if this type of error occurs configure api/auth/register page
 */
