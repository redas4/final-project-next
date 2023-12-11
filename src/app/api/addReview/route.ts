import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business, User, Review } from "../../../../models/user";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, reviewText, reviewTitle, reviewStatus, selectedBusinessId } = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email: userEmail }).select('_id');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const newReview = await Review.create({
      title: reviewTitle,
      comment: reviewText,
      status: reviewStatus,
      userId: user._id,
      businessId: selectedBusinessId,
    });

      await User.updateOne({ _id: user._id }, { $push: { reviews: newReview._id } });
      await Business.updateOne({ _id: selectedBusinessId }, { $push: { reviews: newReview._id } });


    return NextResponse.json({ message: 'Review Added' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while posting review' }, { status: 500 });
  }
}
