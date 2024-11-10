import { NextRequest, NextResponse } from "next/server";

function createCspHeader(nonce: string, isLandingPage: boolean): string {
  const baseCSP = `
    default-src 'self' https://jerenyon.dev https://www.jerenyon.dev;
    img-src 'self' blob: data: https://jerenyon.dev https://www.jerenyon.dev https://jerenyon-dev-cdn.b-cdn.net https://app.usercentrics.eu;
    font-src 'self' https://jerenyon.dev https://www.jerenyon.dev;
    object-src 'none';
    base-uri 'self' https://jerenyon.dev https://www.jerenyon.dev;
    form-action 'self' https://jerenyon.dev https://www.jerenyon.dev;
    frame-src 'self' https://www.google.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const commonScriptSources = `
    https://jerenyon.dev 
    https://www.jerenyon.dev 
    https://www.google.com 
    https://www.gstatic.com 
    https://app.termageddon.com 
    https://privacy-proxy.usercentrics.eu 
    https://app.usercentrics.eu 
    https://vercel.live 
    https://vercel.live/_next-live/feedback 
    https://unpkg.com
  `
    .replace(/\s+/g, " ")
    .trim();

  const commonStyleSources = `
    https://jerenyon.dev 
    https://www.jerenyon.dev 
    https://app.termageddon.com 
    https://vercel.live
  `
    .replace(/\s+/g, " ")
    .trim();

  const commonConnectSources = `
    https://jerenyon.dev 
    https://www.jerenyon.dev 
    https://app.termageddon.com 
    https://privacy-proxy.usercentrics.eu 
    https://app.usercentrics.eu 
    https://api.usercentrics.eu 
    https://vercel.live
  `
    .replace(/\s+/g, " ")
    .trim();

  const splineConnectSources = `
    https://unpkg.com/@splinetool/modelling-wasm@* 
    https://unpkg.com/@splinetool/* 
    https://fonts.gstatic.com 
    wss://ws-us3.pusher.com
  `
    .replace(/\s+/g, " ")
    .trim();

  // Define script-src, style-src, and connect-src based on the page type
  const scriptSrc = `'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic' blob: ${commonScriptSources}`;
  const styleSrc = `'self' 'nonce-${nonce}' ${isLandingPage ? "'unsafe-eval'" : ""} ${commonStyleSources}`;
  const connectSrc = `'self' ${commonConnectSources} ${isLandingPage ? splineConnectSources : ""}`;

  const cspExtras = `
    script-src ${scriptSrc};
    style-src ${styleSrc};
    connect-src ${connectSrc};
  `;

  const cspHeader = `${baseCSP}${cspExtras}`.replace(/\s{2,}/g, " ").trim();

  return cspHeader;
}

function cspMiddleware(req: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isLandingPage =
    req.nextUrl.pathname === "/" || req.nextUrl.pathname === "";
  const cspHeader = createCspHeader(nonce, isLandingPage);

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Ensure no caching to prevent stale CSP headers
  response.headers.set("Cache-Control", "no-store, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
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
