import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";

export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    console.log("Session," , session);
    console.log("data: in profile/route.js",data);
    if("name" in data){

    }

    return Response.json(true);
}