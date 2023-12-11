import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business, Review, User } from "../../../../models/user";


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const data = await User.findOne({ email }).select({
            reviews: 1
        });
        const reviewObjects = []; 

        for (const reviewId of data.reviews) {
            const reviewData = await Review.findOne({
                _id: reviewId,
                status: 'public',
            }).select({
                title: 1,
                comment: 1,
                businessId: 1, 
            }).populate('businessId', 'name');
            if (reviewData) {

                reviewObjects.push({
                    title: reviewData.title,
                    comment: reviewData.comment,
                    businessName: reviewData.businessId.name, 
                });
            }
        }
        const user = {
            reviews: reviewObjects,
        };
    
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error during user data fetch:", error);
        return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 });
    }
    
}
