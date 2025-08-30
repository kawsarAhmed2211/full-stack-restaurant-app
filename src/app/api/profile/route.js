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

    if("name" in data){
        console.log("Name in /api/profile",session.user.name);
        console.log("Email in /api/profile",session.user.email);

        const newUser = await User.updateOne({email}, {name:data.name});
        console.log("newUser",newUser);
    }

    return Response.json(true);
}