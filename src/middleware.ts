import { NextRequest, NextResponse } from "next/server";

// New CSP middleware function
function cspMiddleware(req: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

// Combined middleware function
export function middleware(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  let response: NextResponse;

  if (!isDev) {
    response = cspMiddleware(req);
  } else {
    response = NextResponse.next();
  }

  return response;
}

export const config = {
  matcher: [
    "/", // Redirect to a matching locale at the root
    "/((?!_next|_vercel|.*\\..*).*)", // Exclude image paths and /docs/auto-loops from locale prefixing
    "/((?!api|_next/static|_next/image|static|favicon.ico|favicon.png).*)", // Match all paths except API, static files, and favicon
  ],
};
