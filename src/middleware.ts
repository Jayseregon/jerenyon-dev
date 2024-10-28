import { NextRequest, NextResponse } from "next/server";

function cspMiddleware(req: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
  default-src 'self' https://www.jerenyon.dev;
  script-src 'self' 'nonce-${nonce}' https://www.jerenyon.dev https://www.google.com https://www.gstatic.com https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://vercel.live;
  style-src 'self' 'nonce-${nonce}' https://www.jerenyon.dev https://app.termageddon.com https://vercel.live 'unsafe-inline';
  img-src 'self' blob: data: https://www.jerenyon.dev https://jerenyon-dev-cdn.b-cdn.net https://vercel.live https://vercel.com;
  font-src 'self' https://www.jerenyon.dev https://vercel.live https://assets.vercel.com
  connect-src 'self' https://app.termageddon.com https://privacy-proxy.usercentrics.eu https://app.usercentrics.eu https://api.usercentrics.eu https://vercel.live wss://ws-us3.pusher.com;
  object-src 'none';
  base-uri 'self' https://www.jerenyon.dev;
  form-action 'self' https://www.jerenyon.dev;
  frame-src 'self' https://www.google.com https://vercel.live;
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
