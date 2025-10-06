import {MenuItem} from "../../../models/MenuItem";
import mongoose from "mongoose";


export async function POST(req){
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data)
    return Response.json(menuItemDoc);
}


export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}
export async function GET(req){
    await mongoose.connect(process.env.MONGODB_URI);

    const menuItems = await MenuItem.find();   // fetch all items
    return Response.json(menuItems);
}

export async function DELETE(req) {
    await mongoose.connect(process.env.MONGODB_URI);
    const {_id} = await req.json();
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}