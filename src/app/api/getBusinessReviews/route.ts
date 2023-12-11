import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business, Review } from "../../../../models/user";


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email } = await req.json();

        const data = await Business.findOne({ email }).select({
            email: 1,
            name: 1,
            description: 1,
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
            });
            reviewObjects.push({
                title: reviewData.title,
                comment: reviewData.comment,
            });
        }
        const business = {
        name: data.name,
        email: data.email,
        description: data.description,
        reviews: reviewObjects,
        };

        return NextResponse.json({ business });
    } catch (error) {
        console.error("Error during business data fetch:", error);
        return NextResponse.json({ message: 'An error occurred while fetching business data' }, { status: 500 });
    }
}