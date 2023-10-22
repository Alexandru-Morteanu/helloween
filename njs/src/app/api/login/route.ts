import connectToMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import LogIn from "@/models/LogInSchema";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { serialize } from "cookie";
export async function POST(req: NextRequest, res: NextResponse) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing data! Please complete the required fields!",
      },
      { status: 401 }
    );
  }
  connectToMongoDB();
  const user = await LogIn.findOne({
    username: username,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        password: user.password,
      },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: "24h",
      }
    );
    const serialized = serialize("sessionToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    //Send the cookie and a response to the frontend
    const response = {
      message: "LogIn successful",
    };
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } else {
    return NextResponse.json(
      { success: true, message: "Wrong data, please try again!" },
      { status: 401 }
    );
  }
}
