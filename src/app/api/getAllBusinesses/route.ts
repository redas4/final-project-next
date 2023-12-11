import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import { Business } from "../../../../models/user";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const businesses = await Business.find({}, { name: 1, description: 1 });

    const businessesData = businesses.map((business) => ({
      businessId: business._id.toString(), 
      name: business.name,
      description: business.description,
    }));

    return NextResponse.json({ businesses: businessesData });
  } catch (error) {
    console.error("Error during fetching businesses data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching businesses data" },
      { status: 500 }
    );
  }
}
