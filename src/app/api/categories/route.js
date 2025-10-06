import {Category} from "../../../models/category";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URI);
    const {name} = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);

}

export async function GET(req){
    mongoose.connect(process.env.MONGODB_URI);
    return Response.json(
        await Category.find()
    );
}

export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const {_id, name} = await req.json();
    await Category.updateOne({_id}, {name});
    return Response.json(true);
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGODB_URI);
    const {_id} = await req.json();
    await Category.deleteOne({_id});
    return Response.json(true);
}