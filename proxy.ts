import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

// Public routes that don't require authentication
const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/check-your-inbox",
];

// Routes that should redirect to dashboard if user is authenticated
const authRoutes = ["/signin", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ignore next internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files (images, favicon, etc.)
  ) {
    return NextResponse.next();
  }

  // check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!pathnameHasLocale) {
    // redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|ar)/);
  const locale = localeMatch ? localeMatch[1] : defaultLocale;

  // Check if this is a public route
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === `/${locale}${route}` ||
      pathname.startsWith(`/${locale}${route}/`),
  );

  // Check if this is an auth route (signin/signup)
  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === `/${locale}${route}` ||
      pathname.startsWith(`/${locale}${route}/`),
  );

  // Check for auth token cookie
  const hasAuthToken = request.cookies.has("sanad_auth_token");

  // If user is authenticated and trying to access signin/signup, redirect to dashboard
  if (isAuthRoute && hasAuthToken) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/userdashboard`;
    return NextResponse.redirect(url);
  }

  // For now, we don't block protected routes in middleware
  // Protection is handled at the server component level (dashboard layouts)
  // This can be enhanced later if needed

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
