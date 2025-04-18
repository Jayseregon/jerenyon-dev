import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const isLocalDev = process.env.NODE_ENV === "development";

const permissionsPolicy = `
  accelerometer=(self), 
  ambient-light-sensor=(), 
  autoplay=(), 
  battery=(), 
  camera=(), 
  display-capture=(), 
  document-domain=(), 
  encrypted-media=(), 
  fullscreen=(), 
  geolocation=(), 
  gyroscope=(self), 
  layout-animations=(), 
  legacy-image-formats=(), 
  magnetometer=(), 
  microphone=(), 
  midi=(), 
  navigation-override=(), 
  payment=(), 
  picture-in-picture=(), 
  publickey-credentials-get=(), 
  sync-xhr=(), 
  usb=(), 
  wake-lock=(), 
  web-share=(), 
  xr-spatial-tracking=()
`.replace(/[\n\s]+/g, "");

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['motion/react'],
  },
  
  // Configure image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jerenyon-dev-remote-pull.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app.usercentrics.eu",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  
  // Add headers configuration
  async headers() {
    // Base security headers for production
    const baseHeaders = isLocalDev
      ? []
      : [
          {
            source: "/:path*",
            headers: [
              {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload",
              },
              { key: "X-Frame-Options", value: "SAMEORIGIN" },
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "X-DNS-Prefetch-Control", value: "on" },
              {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
              },
              { key: "Permissions-Policy", value: permissionsPolicy },
            ],
          },
        ];

    // Cache optimization headers - only add in production
    const cacheHeaders = isLocalDev
      ? []
      : [
          {
            source: '/_next/static/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/static/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            source: '/(.*)\.(jpg|png|webp|svg|ico|woff2)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
        ];

    // Combine all headers
    return [...baseHeaders, ...cacheHeaders];
  },
};

export default withNextIntl(nextConfig);
