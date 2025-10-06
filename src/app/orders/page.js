"use client"
import UserTabs from "../components/layout/UserTabs";
import {useProfile} from "../components/UseProfile";
import {useEffect} from "react";

export default function OrderPage(){

    const {loading,data} = useProfile();

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }
    return(
        <>
            <UserTabs isAdmin={true} />
        </>
    )
}