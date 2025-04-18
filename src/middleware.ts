import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

function cspMiddleware(req: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
  default-src 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic' blob: https://jerenyon.dev https://www.jerenyon.dev https://www.google.com https://www.gstatic.com https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://termageddon.ams3.cdn.digitaloceanspaces.com https://vercel.live https://vercel.live/_next-live/feedback https://*.linkedin.com https://*.licdn.com https://analytics.jerenyon.dev;
  style-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' https://jerenyon.dev https://www.jerenyon.dev https://app.termageddon.com https://vercel.live;
  img-src 'self' blob: data: https://jerenyon.dev https://www.jerenyon.dev https://jerenyon-dev-cdn.b-cdn.net https://jerenyon-dev-remote-pull.b-cdn.net https://app.usercentrics.eu https://uct.service.usercentrics.eu https://avatars.githubusercontent.com https://*.linkedin.com;
  font-src 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  connect-src 'self' https://jerenyon.dev https://www.jerenyon.dev https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://api.usercentrics.eu https://vercel.live https://fonts.gstatic.com https://consent-api.service.consent.usercentrics.eu https://graphql.usercentrics.eu https://*.linkedin.com https://analytics.jerenyon.dev https://aggregator.service.usercentrics.eu https://termageddon.ams3.cdn.digitaloceanspaces.com https://analytics.jayseregon.com;
  object-src 'none';
  base-uri 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  form-action 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  frame-src 'self' https://www.google.com https://*.linkedin.com;
  frame-ancestors 'none';
  priority 'high' https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js;
  upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the request is for the /hobbiton route or its subroutes
  if (pathname.startsWith("/hobbiton")) {
    const session = await auth();

    // If the user is not authenticated, redirect to the sign-in page
    if (!session) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Apply your existing CSP middleware in production
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return cspMiddleware(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/hobbiton/:path*", // Protect admin routes
    "/", // Root for CSP
    "/((?!_next/static|_vercel|.*\\..*).*)", // Exclude Next.js static routes and other specified patterns
    "/((?!api|_next/static|_next/image|_next/data|static|favicon.ico|favicon.png|favicon.webp).*)", // Exclude API routes, static assets, etc.
  ],
};
