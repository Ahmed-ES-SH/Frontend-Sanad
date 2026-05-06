import { setAuthCookie } from "@/app/helpers/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/en/signin?error=oauth_missing_token", request.url),
    );
  }

  try {
    await setAuthCookie(token);

    const response = NextResponse.redirect(
      new URL("/en/dashboard", request.url),
    );

    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/en/signin?error=oauth_callback_failed", request.url),
    );
  }
}
