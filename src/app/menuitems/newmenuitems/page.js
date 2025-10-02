"use client"

import {useProfile} from "../../components/UseProfile"
import Link from "next/link";
import EditableImage from "../../components/layout/EditableImage";
import {useState} from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import Right from "../../components/icons/Right";
import Left from "../../components/icons/Left";
import {redirect} from "next/navigation";
import MenuItemFormPage from "../../components/layout/MenuItemForm";

export default function NewMenuItemPage(){

    // const [image, setImage] = useState("");
    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const[basePrice, setBasePrice] = useState("");
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile()

    if(loading){
        return "Loading user info...";
    }
    if(!data.admin){
        return "Not an admin...";
    }

    async function handleMenuPageForm(e, data){
        e.preventDefault();
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch("/api/menu-items",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            if(response.ok){
                resolve()
            }else{
                reject();
            }
        })
        await toast.promise(savingPromise,{
            loading: "saving this item...",
            success: "Item successfully added!",
            error: "Item failed!"
        })

        setRedirectToItems(true);
    }

    if(redirectToItems){
        return redirect("/menuitems");
    }

    return(
        <section>
            <UserTabs admin={true} />
            <div className="mt-8 flex justify-center ">
                <Link href={"/menuitems"}>
                    <span><Left /> Show all menu items <Right/></span>
                </Link>
            </div>

            <MenuItemFormPage menuItem={null} onSubmit={handleMenuPageForm} />
            {/*<form className="mt-8 max-w-md mx-auto" onSubmit={handleMenuPageForm}>*/}
            {/*    <div className="flex items-start gap-4">*/}
            {/*        <div className="grid-cols-[1/3fr]">*/}
            {/*            <EditableImage link={image} setLink={setImage}/>*/}
            {/*        </div>*/}
            {/*        <div className="grow">*/}
            {/*            <label>item name</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={name}*/}
            {/*                onChange={(e) => setName(e.target.value)}*/}
            {/*            />*/}
            {/*            <label>Description</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={description}*/}
            {/*                onChange={(e) => setDescription(e.target.value)}/>*/}
            {/*            <label>Base Price</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                value={basePrice}*/}
            {/*                onChange={(e) => setBasePrice(e.target.value)}/>*/}
            {/*            <button type="submit">Save</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </section>
    )
}