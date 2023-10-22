import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
interface NextRequestWithUser extends NextRequest {
  user?: { id: string; username: string; password: string };
}
export async function GET(req: NextRequestWithUser, res: NextResponse) {
  const userCookie = cookies();

  const token = userCookie.get("sessionToken");
  if (token) {
    try {
      const decoded = verify(token.value, `${process.env.SECRET_KEY}`);
      req.user = decoded as { id: string; username: string; password: string };
      const response = {
        user: req.user,
        validlog: true,
      };
      return new NextResponse(JSON.stringify(response), {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        { user: null, validlog: false },
        {
          status: 200,
        }
      );
    }
  } else {
    return NextResponse.json({ user: null, validlog: false }, { status: 401 });
  }
}
