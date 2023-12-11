import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";

import CredentialsProvider  from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import {Business, User} from "../../../../../models/user";
import bcrypt from 'bcryptjs';
  

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Welcome Back",
            type: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
              },
            // @ts-ignore
            async authorize(credentials) {
                // const {email, password} = credentials;
                const email = credentials?.email
                const password = credentials?.password
                try {
                    // this is being hit on: sign in, 
                    await connectMongoDB();
                    const user = await User.findOne({email})
                    const business = await Business.findOne({email})
                    
                    if(user) {
                        const passwordsMatchUser = await bcrypt.compare(password!, user.password)
                        if(passwordsMatchUser) {
                            return user;
                        } else {
                            return null;
                        }
                    } else if(business){
                        const passwordsMatchBusiness = await bcrypt.compare(password!, business.password)
                        if(passwordsMatchBusiness) {
                            return business
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log('Error: ', error)
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


