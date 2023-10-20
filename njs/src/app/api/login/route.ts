import connectToMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import LogIn from "@/models/LogInSchema";
export async function POST(req: NextRequest, res: NextRequest) {
  if (req.body) {
    const { username, password } = await new Response(req.body).json();
    await connectToMongoDB();
    const user = await LogIn.findOne({
      username: username,
      password: password,
    });
    if (user) {
      return NextResponse.json(
        { success: true, message: "LogIn succesful!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: "LogIn unsuccesful!" },
        { status: 401 }
      );
    }
  }
}
