// import toast from "react-hot-toast";
// import Image from "next/image";
//
// export default function EditableImage({link, setLink}){
//     async function handleFileChange(e){
//         //console.log("files");
//         const files = e.target.files;
//         //console.log("files", files);
//         if(files?.length === 1){
//             const data = new FormData;
//             data.set("files", files[0]);
//             //toast("Uploading...");
//             //console.log("function for data in api/upload ",data);
//
//             const uploadPromise = new Promise(async (resolve, reject) => {
//                 const response = await fetch("api/upload",{
//                     method: "POST",
//                     body: data
//                 })
//                 if(response.ok){
//                     // toast.success("Upload complete");
//                     // console.log("response from profile/page.js: ", response);
//                     const link = await response.json();
//                     //console.log("link from profile/page.js", link);
//                     setLink(link);
//                     resolve();
//                 }else{
//                     reject();
//                     //toast.error("Upload failed");
//                 }
//                 // const link = await response.json();
//                 // console.log("link from profile/page.js", link);
//                 // setImage(link);
//                 // setIsUploading(false);
//
//                 await toast.promise(uploadPromise, {
//                     loading : "Uploading...",
//                     success : "Upload Success",
//                     error : "Upload Error",
//                 })
//             })
//
//         }
//     }
//
//     return(
//         <>
//             {link && (
//                     <Image className="rounded-lg w-full h-full mb-1" src={link}
//                            width={250} height={250} alt={"avatar"} />
//             )}
//             {!link && (
//                 <div>
//                     No images found.
//                 </div>
//             )}
//             <label>
//                 <input type="file" className="hidden" onChange = {handleFileChange}/>
//                 <span className="text-center block cursor-pointer">Edit</span>
//             </label>
//         </>
//     )
//
// }

import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set("files", files[0]); // ensure backend expects "file"

            const uploadPromise = fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then(async (response) => {
                if (!response.ok) {
                    throw new Error("Upload failed");
                }
                const uploadedLink = await response.json();
                setLink(uploadedLink);
                return uploadedLink;
            });

            await toast.promise(uploadPromise, {
                loading: "Uploading...",
                success: "Upload Success",
                error: "Upload Error",
            });
        }
    }

    return (
        <>
            {link ? (
                <Image
                    className="rounded-lg w-full h-full mb-1"
                    src={link}
                    width={250}
                    height={250}
                    alt="avatar"
                />
            ) : (
                <div className="w-64 h-64 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg mb-1">
                    No image selected
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="text-center block cursor-pointer underline text-blue-600">
          Edit
        </span>
            </label>
        </>
    );
}
