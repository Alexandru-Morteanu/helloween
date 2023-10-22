import connectToMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Story from "@/models/SendStory";
export async function POST(req: NextRequest, res: NextResponse) {
  const { author, story } = await req.json();
  connectToMongoDB();
  const storyData = await Story.insertMany({
    author: author,
    story: story,
  });
  if (storyData) {
    return NextResponse.json(
      { success: true, message: "Story was sent succesfully! \u{1F383}" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        success: true,
        message: "\u{1F6A8} Story couldn't be sent! Please try again \u{1F6A8}",
      },
      { status: 401 }
    );
  }
}
