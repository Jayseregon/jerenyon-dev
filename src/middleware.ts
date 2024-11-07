import { NextRequest, NextResponse } from "next/server";

function cspMiddleware(req: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
  default-src 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic' blob: https://jerenyon.dev https://www.jerenyon.dev https://www.google.com https://www.gstatic.com https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://vercel.live https://vercel.live/_next-live/feedback;
  style-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://jerenyon.dev https://www.jerenyon.dev https://app.termageddon.com https://vercel.live;
  img-src 'self' blob: data: https://jerenyon.dev https://www.jerenyon.dev https://jerenyon-dev-cdn.b-cdn.net https://app.usercentrics.eu;
  font-src 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  connect-src 'self' https://jerenyon.dev https://www.jerenyon.dev https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://api.usercentrics.eu https://vercel.live https://unpkg.com https://fonts.gstatic.com wss://ws-us3.pusher.com;
  object-src 'none';
  base-uri 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  form-action 'self' https://jerenyon.dev https://www.jerenyon.dev ;
  frame-src 'self' https://www.google.com;
  frame-ancestors 'none';
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

export function middleware(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return cspMiddleware(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/", // Root
    "/((?!_next|_vercel|.*\\..*).*)", // Exclude certain paths
    "/((?!api|_next/static|_next/image|static|favicon.ico|favicon.png|favicon-light.png|favicon-dark.png).*)",
  ],
};
