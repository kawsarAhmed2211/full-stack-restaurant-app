import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";
import User from "../../../models/User";
import UserInfo from "../../../models/UserInfo";

export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    //const{name, image} = data;
    const{name, image, ...otherUserInfo} = data;
    console.log("data in api/profile", otherUserInfo);
    const session = await getServerSession(authOptions);
    //console.log("Session," , session);
    console.log("data: in profile/page.js",{session,data});
    const email = session.user.email;
    //console.log("email in /api/profile",email);
    const userData = {name: data.name, image: data.image};
    console.log("userdata", userData);
    await User.updateOne({email}, {name, image});

    // await User.updateOne({email}, otherUserInfo);
    //console.log(user);

    await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert: true});

    const update ={};
    if("name" in data){
        //console.log("Name in /api/profile",session.user.name);
        //console.log("Email in /api/profile",session.user.email);
        update.name = data.name;

    }
    if("image" in data){
        //console.log("image updated in api/profile", session.user.image);
        update.image = data.image;
        console.log("image updated in api/profile", session.user.image);
    }
    if("postcode" in data){
        update.postcode = data.postcode;
    }
    if("country" in data){
        update.country = data.country;
    }
    if("city" in data){
        update.city = data.city;
    }
    if("streetAddress" in data){
        update.streetAddress = data.streetAddress;
    }
    if("phone" in data){
        update.phone = data.phone;
    }
    if(Object.keys(update).length > 0){

        const newUser = await User.updateOne({email}, update);
        console.log("newUser",newUser);
    }

    return Response.json( true);
}

export async function GET(req){
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    //console.log("Session,"  , session);
    //console.log("data: in /get method /api/profile",session);
    const email = session?.user?.email;
    if(!email){
        return Response.json({});
    }

    const user = await User.findOne({email}).lean();
    const userInfo = await UserInfo.findOne({email}).lean();
    //return Response.json({...user});
    return Response.json({...user, ...userInfo});
}