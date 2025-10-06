import {isAdmin} from "../auth/[...nextauth]/route";
import {User} from "../../../models/User";
import mongoose from "mongoose";

export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI);

        const users = await User.find();
        return Response.json(users);

}