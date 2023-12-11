import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business } from "../../../../models/user";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest){
    try {
        const {name, email, description, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await Business.create({name, email, description, password: hashedPassword})
        return NextResponse.json({message: 'Business Registered'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: 'An error occured while registering'}, {status: 500})
    }
}