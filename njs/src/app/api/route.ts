import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.body) {
    const { username, password } = await new Response(req.body).json();
    console.log(username, password);

    if (username === "1234" && password === "1234") {
      return NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  }
}
