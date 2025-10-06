// "use client"
// import UserTabs from "../components/layout/UserTabs";
// import { useEffect, useState } from "react";
// import {useProfile} from "../components/UseProfile";
// import toast from "react-hot-toast";
// export default function CategoryPage() {
//     // const [admin, setAdmin] = useState(false);
//     // const [adminInfoLoading, setAdminInfoLoading] = useState(false);
//     // useEffect(() => {
//     //     fetch("/api/profile")
//     //         .then(res => res.json())
//     //         .then(data => {
//     //             setAdmin(data?.admin);
//     //             setAdminInfoLoading(false);
//     //         })
//     //         .catch(err => console.error("Failed to fetch profile:", err));
//     // }, []);
//     //
//     // if(adminInfoLoading){
//     //     return "Loading...";
//     // }
//     //
//     // if(!admin){
//     //     return  "Not an admin";
//     // }
//
//     const {loading:profileLoading, data:profileData} = useProfile();
//     const [categories, setCategories] = useState([]);
//     const [newCategoryName, setNewCategoryName] = useState("");
//     const [editedCategory, setEditedCategory] = useState(null);
//     const [categoryName, setCategoryName] = useState("");
//
//     useEffect(() => {
//         fetchCategories();
//     },[])
//
//     async function fetchCategories() {
//         fetch("/api/categories").then(response =>{
//             response.json().then((categories) => {
//                 setCategories(categories);
//             })
//         })
//     }
//
//
//     async function handleNewCategorySubmit(e){
//         e.preventDefault();
//         const creationPromise = new Promise(async(resolve, reject) => {
//             const data = {name: newCategoryName};
//             if(editedCategory){
//                 data._id = editedCategory._id;
//             }
//             const response = await fetch("/api/categories", {
//                 method: editedCategory? "PUT" : "POST",
//                 headers: {"Content-Type": 'application/json'},
//                 body: JSON.stringify(data)
//             })
//             setCategoryName("");
//             fetchCategories();
//             setNewCategoryName(null);
//             if(response.ok){
//                 resolve(response);
//             }else{
//                 reject(response);
//             }
//             toast.promise(creationPromise, {
//                 loading: editedCategory? "Updating Category ":"Creating category...",
//                 success: editedCategory? "Category Updated":"Category created",
//                 error: "response",
//             });
//         })
//
//
//     }
//
//     if(profileLoading){
//         return "Loading from /categories page...";
//     }
//
//     if(!profileData.admin){
//         return "Not an admin";
//     }
//     return (
//         <section>
//             {/*//the little code down there is a component and if added there no need for hardcoding*/}
//             <UserTabs admin={true} />
//             <form className="mt-8" onSubmit={handleNewCategorySubmit}>
//                 <div className="">
//                     <div className="">
//                         <label> {editedCategory? "Update Category" : "New category"}
//                             {editedCategory && (
//                                 <>: <b>{editedCategory.name}</b></>
//                             )}
//                         </label>
//                         <input type="text"  value={categoryName}
//                                onChange={(e) =>
//                                    setCategoryName(e.target.value)}/>
//                     </div>
//                 </div>
//                 <div>
//                     <button type="submit">
//                         {editedCategory? "Update category" : "Create category"}
//                         </button>
//                 </div>
//             </form>
//             <div>
//                 <h2 className="mt-8">Edit Category: </h2>
//                 {categories.length > 0 &&
//                     categories.map((category, index) => (
//                         <button className="bg-red-400 rounded-xl gap-2 p-2 px-4 flex cursor-pointer" key={index}
//                         onClick={() =>{
//                             setEditedCategory(category);
//                             setCategoryName(category.name);
//                         }}>
//                             <span>{category.name}</span>
//                         </button>
//                     ))
//                 }
//             </div>
//
//         </section>
//     );
// }


"use client";
import UserTabs from "../components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "../components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "../components/DeleteButton";


export default function CategoryPage() {
    const { loading: profileLoading, data: profileData } = useProfile();
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
    }

    async function handleNewCategorySubmit(e) {
        e.preventDefault();

        const data = { name: categoryName };
        if (editedCategory) {
            data._id = editedCategory._id; // ✅ fixed
        }

        const promise = fetch("/api/categories", {
            method: editedCategory ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(async (res) => {
            if (!res.ok) throw new Error("Failed to save category");
            await fetchCategories();
            setCategoryName(""); // ✅ reset input
            setEditedCategory(null); // ✅ reset editing mode
            return res;
        });

        await toast.promise(promise, {
            loading: editedCategory ? "Updating category..." : "Creating category...",
            success: editedCategory ? "Category updated!" : "Category created!",
            error: "Something went wrong.",
        });
    }

    async function handleDeleteButton(_id){
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/categories?_id="+ _id, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({_id}),
            })
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        })

        await toast.promise(promise,{
            loading: "Deleting",
            success: "Deleted",
            error: "error from deleting category",
            }
        )
        fetchCategories();
    }

    if (profileLoading) {
        return "Loading from /categories page...";
    }

    if (!profileData.admin) {
        return "Not an admin";
    }

    return (
        <section>
            <UserTabs admin={true} />

            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div>
                    <label>
                        {editedCategory ? "Update Category" : "New Category"}
                        {editedCategory && (
                            <>
                                : <b>{editedCategory.name}</b>
                            </>
                        )}
                    </label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <button type="submit">
                        {editedCategory ? "Update Category" : "Create Category"}
                    </button>
                    <button className="bg-blue-300"
                            type="button"
                            onClick={()=> {
                                setEditedCategory(null);
                                setCategoryName("");
                    }}>Cancel</button>
                </div>
            </form>

            <div>
                <h2 className="mt-8">Existing Categories</h2>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <div
                            className="bg-red-400 rounded-xl gap-2 p-2 px-4 flex cursor-pointer"
                            key={category._id}
                         >
                            {/*<span>{category.name}</span>*/}
                            <div className="flex items-center gap-2">
                                <span>{category.name}</span>
                                <button
                                    onClick={() => {
                                        setEditedCategory(category);
                                        setCategoryName(category.name);
                                    }}
                                    type="button">Edit</button>
                                <DeleteButton label="Delete" onDelete={() => handleDeleteButton(category._id)}/>
                                {/*<button*/}
                                {/*    onClick={()=>{*/}
                                {/*        handleDeleteButton(category._id)*/}
                                {/*    }}*/}
                                {/*    type="button"*/}
                                {/*    >Delete</button>*/}
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}

