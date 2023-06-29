import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    //Manage rate limiting

    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
          return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
          );
        }
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }

    //route protection

    const token = await getToken({ req });
    const isAuth = !!token;

    const isAuthPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];
    if (isAuthPage && isAuth) {
      return NextResponse.redirect("/dashboard");
    }

    if (isAuthPage && !isAuth) {
      return null;
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/api/:path*", "/test/:path*"],
};
