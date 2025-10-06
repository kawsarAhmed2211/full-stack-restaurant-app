import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, {getServerSession} from "next-auth";
import mongoose from "mongoose";
import User from "../../../../models/User";
import UserInfo from "../../../../models/UserInfo";

export  const authOptions ={
    providers: [
        CredentialsProvider({
            secret: process.env.SECRET,
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            id: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {label: "Email", type: "email", placeholder: "test@gmail.com"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                console.log(credentials);

                mongoose.connect(process.env.MONGODB_URI);
                const user = await User.findOne({email: email});

                return user;
            }
        })
    ]
}

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({email:userEmail});
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST }
