// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher([
  "/home(.*)",
  "/transactions(.*)",
  "/dashboard(.*)",
  "/settings(.*)",
  // add more protected routes here
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is authenticated and on the landing page, redirect to /home
  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Only protect routes that match your protected route matcher
  if (isProtectedRoute(req)) {
    await auth.protect(); // redirects to /sign-in if not signed in
  }
});

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
