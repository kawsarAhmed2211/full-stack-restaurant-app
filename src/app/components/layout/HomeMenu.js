import Image from "next/image";

import SectionHeader from "./SectionHeader";
import MenuItem from "../menu/MenuItem";
export default function HomeMenu(){
    return (
        <section className="">
            <div className="relative ">
                <div className="absolute h-42 w-42 -left-5">
                    <Image src={"/salad.png"} layout={"fill"}  objectFit={"contain"} alt={"salad"} />
                </div>
                <div className="absolute h-42 w-42 -right-3 -top-4">
                    <Image src={"/salad.png"} layout={"fill"}  objectFit={"contain"} alt={"salad"} />
                </div>
            </div>
            <SectionHeader subheader={"check out"} mainheader={"Menu"} />
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}