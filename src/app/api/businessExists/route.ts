import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business } from "../../../../models/user";


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const {email} = await req.json();
        const business = await Business.findOne({email}).select('_id');
        return NextResponse.json({business});
    } catch (error) {
        console.log(error)
    }
}