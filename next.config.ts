import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const hippoApiUrl = process.env.HIPPO_API_URL ?? "http://127.0.0.1:8000";

if (isProduction && !process.env.HIPPO_API_URL) {
  throw new Error("HIPPO_API_URL must be set in production.");
}

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://formsubmit.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formsubmit.co",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/backend/sessions",
        destination: `${hippoApiUrl}/sessions`,
      },
      {
        source: "/backend/chat",
        destination: `${hippoApiUrl}/chat`,
      },
      {
        source: "/backend/analytics",
        destination: `${hippoApiUrl}/analytics`,
      },
    ];
  },
};

export default nextConfig;
