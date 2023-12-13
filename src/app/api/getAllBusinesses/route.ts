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
    const response = NextResponse.json({ businesses: businessesData });

    // Set cache control headers to prevent caching
    response.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    return response;
  } catch (error) {
    console.error("Error during fetching businesses data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching businesses data" },
      { status: 500 }
    );
  }
}
