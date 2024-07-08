const createNextIntlPlugin = require('next-intl/plugin');
const path = require('path');
const crypto = require('crypto');

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === 'development';

// const nonce = crypto.randomBytes(16).toString('base64');
// const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//     style-src 'self' 'nonce-${nonce}';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `.replace(/\n/g, '');


const permissionsPolicy = `
  accelerometer=(), 
  ambient-light-sensor=(), 
  autoplay=(), 
  battery=(), 
  camera=(), 
  display-capture=(), 
  document-domain=(), 
  encrypted-media=(), 
  fullscreen=(), 
  geolocation=(), 
  gyroscope=(), 
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
`.replace(/\n/g, '');

const nextConfig = {
  output: "standalone",
  async headers() {
    return isDev ? [] : [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'Permissions-Policy', value: permissionsPolicy },
          // { key: 'Expect-CT', value: 'max-age=86400, enforce, report-uri="https://yourdomain.com/report"' },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'src/components');
    config.resolve.alias['@/config'] = path.resolve(__dirname, 'src/config');
    return config;
  },
};

module.exports = withNextIntl(nextConfig);