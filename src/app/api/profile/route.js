import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";
import User from "../../../models/User";

export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    console.log("Session," , session);
    console.log("data: in profile/route.js",{session,data});
    const email = session.user.email;
    console.log("email in /api/profile",email);
    const user = await User.findOne({email});
    console.log(user);

    const update ={};
    if("name" in data){
        console.log("Name in /api/profile",session.user.name);
        console.log("Email in /api/profile",session.user.email);
        update.name = data.name;

    }
    if("image" in data){
        console.log("image updated in api/profile", session.user.image);
        update.image = data.image;
        console.log("image updated in api/profile", session.user.image);
    }
    if(Object.keys(update).length > 0){

        const newUser = await User.updateOne({email}, update);
        console.log("newUser",newUser);
    }

    return Response.json( true);
}