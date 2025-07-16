import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/login", "/sign-up"];
const protectedRoutes = ["/", "/expenses", "/profile"];

export default async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  const sessionCookie = getSessionCookie(request);

  if (sessionCookie && isAuthRoute) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  if (!sessionCookie && isProtectedRoute) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const response = NextResponse.next();
  if (sessionCookie) {
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      path: "/",
    });
  }
  console.log("response", response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
