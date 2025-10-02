// "use client";
// import UserTabs from "../components/layout/UserTabs";
// import { useProfile } from "../components/UseProfile";
// import { useEffect, useState } from "react";
// import EditableImage from "../components/layout/EditableImage";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import Right from "../components/icons/Right";
//
// export default function MenuPage() {
//     const [menuItems, setMenuItems] = useState([]);
//     const { loading, data } = useProfile();
//
//     useEffect(() => {
//         fetch("/api/menu-items")
//             .then((response) => response.json())
//             .then((menuItems) => {
//                 setMenuItems(menuItems);
//             })
//             .catch((err) => {
//                 console.error("Error fetching menu items:", err);
//                 toast.error("Failed to load menu items");
//             });
//     }, []);
//
//     if (loading) {
//         return "Loading user info...";
//     }
//
//     if (!data?.admin) {
//         return "Not an admin...";
//     }
//
//     return (
//         <section className="mt-8">
//             <UserTabs admin={data.admin} />
//
//             <div className="mt-8">
//                 <Link className="button flex gap-2" href="/menuitems/newmenuitems">
//                     Create new menu-item
//                     <Right />
//                 </Link>
//             </div>
//
//             <div>
//                 <h2>Edit menu item</h2>
//                 {menuItems?.length > 0 ? (
//                         menuItems.map((menuItem) => (
//                             <button  key = {menuItem._id}>
//                                 {menuItem.name}
//                             </button>
//                         ))
//                         ): (
//                             <p>No items found</p>
//                             )
//                 }
//             </div>
//
//
//             {/*<div className="mt-8">*/}
//             {/*    {menuItems.length === 0 ? (*/}
//             {/*        <p>No menu items found.</p>*/}
//             {/*    ) : (*/}
//             {/*        <ul>*/}
//             {/*            {menuItems.map((item) => (*/}
//             {/*                <li key={item._id}>{item.name}</li>*/}
//             {/*            ))}*/}
//             {/*        </ul>*/}
//             {/*    )}*/}
//             {/*</div>*/}
//         </section>
//     );
// }

"use client";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "../components/UseProfile";
import { useEffect, useState } from "react";
import EditableImage from "../components/layout/EditableImage";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../components/icons/Right";
import Image from "next/image";

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch("/api/menu-items")
            .then((response) => response.json())
            .then((menuItems) => {
                setMenuItems(menuItems);
            })
            .catch((err) => {
                console.error("Error fetching menu items:", err);
                toast.error("Failed to load menu items");
            });
    }, []);

    if (loading) {
        return "Loading user info...";
    }

    if (!data?.admin) {
        return "Not an admin...";
    }

    return (
        <section className="mt-8">
            <UserTabs admin={data.admin} />

            <div className="mt-8">
                <Link className="button flex gap-2" href="/menuitems/newmenuitems">
                    Create new menu-item
                    <Right />
                </Link>
            </div>

            <div className="mt-8">
                <h2>Edit menu item</h2>
                <div className="grid grid-cols-4">
                {menuItems?.length > 0 ? (
                    menuItems.map((item) => (
                        <Link href={"/menuitems/edit/" + item._id} key={item._id} className="mb-1 flex-col">
                            <div className="relative w-24 h-24">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                                        No image
                                    </div>
                                )}
                            </div>
                            {item.name}
                        </Link>

                    ))
                ) : (
                    <p>No menu items found.</p>
                )}
                </div>
            </div>
        </section>
    );
}

