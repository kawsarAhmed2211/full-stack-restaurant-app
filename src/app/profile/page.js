"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import InfoBox from "../components/layout/InfoBox";
import SuccessBox from "../components/layout/SuccessBox";

import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import EditableImage from "../components/layout/EditableImage";

export default function ProfilePage() {
    const session = useSession();
    const { status } = session;
    const[userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");
    const [country, setCountry] = useState("");
    const [admin, setAdmin] = useState(false);
    // const [savedProfile, setSavedProfile] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    // const [isUploading, setIsUploading] = useState(false);
    console.log("Session from profile", session);

    useEffect(() => {
        if(status === "authenticated"){
            setUserName(session?.data?.user?.name);
            setImage(session?.data?.user?.image);

            fetch("/api/profile").then(response =>{
                response.json().then(data => {
                    //console.log("Data from select in profile/page.js", data);
                    //console.log(response);
                    setPhone(data.phone);
                    setCity(data.city);
                    setPostCode(data.postCode);
                    setCountry(data.country);
                    setAdmin(data.admin);

                })
            })
        }
    },[session, status]);


    async function handleProfileInfoUpdate(e){
        e.preventDefault();
        //setSavedProfile(false);
        //setIsSaving(true);
        //toast("Saving...");
        const savingPromise = new Promise(async (resolve, reject) =>{
            const response= await fetch("/api/profile",{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: userName, image,
                phone,
                streetAddress,
                city,
                postCode,
                country,
                }),
            });
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        })

        await toast.promise(savingPromise, {
            loading : "Saving...",
            success : "Profile Saved",
            error : "Profile Error",
        });
        //setIsSaving(false);
        // if(response.ok){
        //     console.log("Response from profile/page.js",response);
        //     toast.success("Profile successfully updated");
        //     //setSavedProfile(true);
        // }
    }

    if (status === "loading") {
        return "loading...";
    }
    if (status === "unauthenticated") {
        // ✅ correct value is "unauthenticated", not "unauthorized"
        return redirect("/login");
    }

    //const userImage = session.data?.user?.image;
    //console.log("X",session.data?.user);

    // async function handleFileChange(e){
    //     //console.log("gggg");
    //     //console.log(e);
    //     console.log("files");
    //     const files = e.target.files;
    //     console.log("files", files);
    //     if(files?.length === 1){
    //         const data = new FormData;
    //         data.set("files", files[0]);
    //         //toast("Uploading...");
    //         //console.log("function for data in api/upload ",data);
    //
    //         const uploadPromise = new Promise(async (resolve, reject) => {
    //             const response = await fetch("api/upload",{
    //                 method: "POST",
    //                 body: data
    //             })
    //             if(response.ok){
    //                 // toast.success("Upload complete");
    //                 // console.log("response from profile/page.js: ", response);
    //                 const link = await response.json();
    //                 //console.log("link from profile/page.js", link);
    //                 setImage(link);
    //                 resolve();
    //             }else{
    //                 reject();
    //                 //toast.error("Upload failed");
    //             }
    //             // const link = await response.json();
    //             // console.log("link from profile/page.js", link);
    //             // setImage(link);
    //             // setIsUploading(false);
    //
    //             await toast.promise(uploadPromise, {
    //                 loading : "Uploading...",
    //                 success : "Upload Success",
    //                 error : "Upload Error",
    //             })
    //         })
    //
    //     }
    //}

    return (
        <>
            <section>
                <UserTabs admin={admin} />
                {/*<div className="flex mx-auto gap-2 tabs justify-center">*/}
                {/*    <Link className={"active"} href={"/profile"}> Profile </Link>*/}
                {/*    {admin && (*/}
                {/*        <>*/}
                {/*        <Link href="/categories">categories</Link>*/}
                {/*        <Link href={"/menuitems"}>menu-items</Link>*/}
                {/*        <Link href={"/users"}> Users</Link>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}
                {/*<UserTabs admin={admin} />*/}
                {/*<h1>Profile</h1>*/}

                {/*{savedProfile && (*/}
                {/*    <SuccessBox>Profile Saved</SuccessBox>*/}
                {/*)}*/}

                {/*{isSaving &&(*/}
                {/*    <InfoBox>Profile Saving...</InfoBox>*/}
                {/*)}*/}

                {/*{isUploading &&(*/}
                {/*    <InfoBox>Uploading...</InfoBox>*/}
                {/*)}*/}
                <form className="max-w-xs mx-auto " onSubmit={handleProfileInfoUpdate}>
                    <div className="flex gap-4">
                       <div>
                           <div className="p-2 rounded-lg relative max-w-[120px]">
                               <EditableImage link={image} setLink={setImage} />
                               {/*{*/}
                                 {/*    image && (*/}
                               {/*        <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt={"avatar"} />*/}
                               {/*    )*/}
                               {/*}*/}
                               {/*<label>*/}
                               {/*    <input type="file" className="hidden" onChange = {handleFileChange}/>*/}
                               {/*    <span className="text-center block cursor-pointer">Edit</span>*/}
                               {/*</label>*/}
                           </div>
                       </div>
                        <div className="grow">
                            <input
                                type="text"
                                //value={userName}
                                placeholder="First and Last Name"
                                onChange={e => setUserName(e.target.value)}
                            />
                            <input className="text-white" type="email" disabled={true} value={session?.data?.user?.email}/>
                            <input type="tel"
                                   placeholder="Phone number"
                                   //value={phone}
                                   onChange={e => setPhone(e.target.value)}
                            />
                            <input type="text"
                                   placeholder="Street address"
                                   //value={streetAddress}
                                   onChange={e => setStreetAddress(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <input type ="text"
                                       placeholder="City"
                                       //value={city}
                                       onChange={e => setCity(e.target.value)}
                                />
                                <input type ="text"
                                       placeholder="Post Code"
                                       //value={postCode}
                                       onChange={e => setPostCode(e.target.value)}
                                />
                            </div>
                            <input type ="text"
                                   placeholder="Country"
                                   //value={country}
                                   onChange={e => setCountry(e.target.value)}
                            />
                            <button type="submit">Save</button>
                        </div>

                    </div>
                </form>
            </section>
        </>
    );
}

{
    /*
    * why do i had to change th file name to page.js instead of page.js
ChatGPT said:

Good question 👍

In Next.js 13+ with the App Router, the file naming convention is very strict:

page.js → used to define a UI route (a React component that renders when the user visits a path in the browser).

page.js → used to define an API route (server-side functions that handle HTTP requests like GET, POST, etc., but no React components).

Why your case needed page.js

You’re building a profile page component (React UI), not an API handler.
That means /app/profile/page.js is the correct filename.

If you leave it as page.js, Next.js expects it to export HTTP handlers like this:

export async function GET(request) {
  return new Response("Profile API GET endpoint");
}

export async function POST(request) {
  return new Response("Profile API POST endpoint");
}


But since you exported a React component (ProfilePage), Next.js complained:

"No HTTP methods exported in page.js"

✅ Rule of thumb in App Router:

If it’s UI/page for users → page.js

If it’s API endpoint → page.js
    *
    *
    * */
}
