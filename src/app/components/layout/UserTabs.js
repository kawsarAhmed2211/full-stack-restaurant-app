"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({admin}){
    const path = usePathname();
    console.log(path);
    return(
        <>
            <div className="flex gap-4 tabs justify-center ">
                <Link
                    className={path === "/profile" ? "active" : ""}
                    href={"/profile"}>Profile</Link>
                {
                    admin && (
                        <>
                            <Link href={"/categories"}>Categories</Link>
                            <Link href={"/menuitems"}>Menu Items</Link>
                            <Link  href={"/users"}>Users</Link>
                            <Link href={"/orders"}>Orders</Link>
                        </>
                    )
                }
            </div>
        </>
    )
}