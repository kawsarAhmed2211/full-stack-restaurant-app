// "use client"
// import {useEffect, useState} from "react";
// import {useProfile} from "../../../components/UseProfile";
// import toast from "react-hot-toast";
// import {redirect, useParams} from "next/navigation";
// import UserTabs from "../../../components/layout/UserTabs";
// import Link from "next/link";
// import Left from "../../../components/icons/Left";
// import Right from "../../../components/icons/Right";
// import EditableImage from "../../../components/layout/EditableImage";
// import MenuItemFormPage from "../../../components/MenuItemForm";
// export default function EditMenuItem() {
//     const {id} = useParams();
//     // const [image, setImage] = useState("");
//     // const [name, setName] = useState("");
//     // const [description, setDescription] = useState("");
//     // const[basePrice, setBasePrice] = useState("");
//     const[menuItem, setMenuItem] = useState(null);
//     const [redirectToItems, setRedirectToItems] = useState(false);
//     const {loading, data} = useProfile();
//
//     useEffect(() => {
//
//         fetch("/api/menu-items")
//             .then(response => response.json())
//             .then(items => {
//             const item = items.find(i => i._id === id);
//             setMenuItem(item);},
//             // setImage(item.image); setName(item.name);
//             // setDescription(item.description);
//             // setBasePrice(item.basePrice); }) },
//         []) ;
//     if(loading){
//         return "Loading user info...";
//     }
//     if(!data.admin){
//         return "Not an admin...";
//     }
//
//     async function handleMenuPageForm(e){
//         e.preventDefault();
//         const savingPromise = new Promise(async(resolve, reject) => {
//             const response = await fetch("/api/menu-items", {
//                 method: "PUT",
//                 body: JSON.stringify({image, name, description, basePrice, _id:id}),
//                 headers: {"Content-Type": "application/json"}
//             });
//             if(response.ok){
//                 resolve()
//             }else{
//                 reject();
//             }
//         })
//
//         await toast.promise(savingPromise,{
//             loading: "saving this item...",
//             success: "Item successfully added!",
//             error: "Item failed!" })
//
//         setRedirectToItems(true);
//     }
//
//     if(redirectToItems){
//         return redirect("/menuitems");
//     }
//
//     return(
//         <section>
//             <UserTabs admin={true} />
//             <div className="mt-8 flex justify-center ">
//                 <Link href={"/menuitems"}>
//                     <span>
//                         <Left />
//                         Show all menu items
//                         <Right/>
//                     </span>
//                 </Link>
//             </div>
//
//             <MenuItemFormPage onSubmit={handleMenuPageForm} menuItem={menuItem} />
//
//             {/*<form className="mt-8 max-w-md mx-auto" onSubmit={handleMenuPageForm}>*/}
//             {/*    <div className="flex items-start gap-4">*/}
//             {/*        <div className="grid-cols-[1/3fr]">*/}
//             {/*            <EditableImage link={image} setLink={setImage}/>*/}
//             {/*        </div>*/}
//             {/*        <div className="grow">*/}
//             {/*            <label>item name</label>*/}
//             {/*            <input type="text" value={name}*/}
//             {/*                   onChange={(e) => setName(e.target.value)} />*/}
//             {/*            <label>Description</label>*/}
//             {/*            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>*/}
//             {/*            <label>Base Price</label>*/}
//             {/*            <input type="text" value={basePrice} onChange={(e) => setBasePrice(e.target.value)}/>*/}
//             {/*            <button type="submit">Save</button>*/}
//             {/*        </div>*/}
//             {/*    </div>*/}
//
//             {/*</form>*/}
//         </section>
//     )
// }

"use client"
import { useEffect, useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import UserTabs from "../../../components/layout/UserTabs";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import Right from "../../../components/icons/Right";
import MenuItemFormPage from "../../../components/layout/MenuItemForm";
import DeleteButton from "../../../components/DeleteButton";

export default function EditMenuItem() {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();

    // fetch the item
    useEffect(() => {
        fetch("/api/menu-items")
            .then((response) => response.json())
            .then((items) => {
                const item = items.find((i) => i._id === id);
                setMenuItem(item);
            });
    }, []);

    if (loading) {
        return "Loading user info...";
    }
    if (!data?.admin) {
        return "Not an admin...";
    }

    async function deleteMenuItemButton(){
        const deletingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch("/api/menu-items?_id="+id,{
                method: "DELETE",
                body: JSON.stringify({_id:id}),
                headers: { "Content-Type": "application/json" },
            })
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        })
        await toast.promise(deletingPromise, {
            loading: "Deleting this item...",
            success: "Item successfully deleted!",
            error: "delete failed!",
        });
        setRedirectToItems(true);
    }


    async function handleMenuPageForm(e, data) {
        e.preventDefault();
        data = { ...data , _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/menu-items", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            console.log("data fom edit",data);
            if (response.ok) resolve();
            else reject();
        });

        await toast.promise(savingPromise, {
            loading: "Saving this item...",
            success: "Item successfully updated!",
            error: "Item failed!",
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect("/menuitems");
    }

    return (
        <section>
            <UserTabs admin={true} />
            <div className="mt-8 flex justify-center">
                <Link href={"/menuitems"}>
                <Left />
                  <span>Show all menu items</span>
                </Link>
            </div>
                <MenuItemFormPage menuItem={menuItem} onSubmit={handleMenuPageForm} />
            <div>
                <DeleteButton label={"Delete this menu item"}
                onDelete={deleteMenuItemButton}/>
                {/*< ><button type="button"*/}
                {/*onClick={deleteMenuItemButton}*/}
                {/*>Delete this menu item</button></>*/}
            </div>
        </section>
    );
}
