import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business, User } from "../../../../models/user";


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const business = await Business.findOne({ email })
        const user = await User.findOne({ email })
        if(user){
            return NextResponse.json({type: 'user'  });
        } else if(business){
            return NextResponse.json({type: 'business'  });
        } else{
            return NextResponse.json({type: 'none' });
        }

    } catch (error) {
        console.error("Error during business data fetch:", error);
        return NextResponse.json({ message: 'An error occurred while fetching business data' }, { status: 500 });
    }
}