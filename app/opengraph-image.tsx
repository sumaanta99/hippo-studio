import { ImageResponse } from "next/og";

import { SITE } from "@/lib/constants";

export const alt = `${SITE.wordmark} — ${SITE.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "linear-gradient(145deg, #09090b 0%, #18181b 55%, #1e1033 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              fontSize: "88px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {SITE.wordmark}
          </div>
        </div>
        <div
          style={{
            fontSize: "44px",
            fontWeight: 500,
            color: "#e4e4e7",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "26px",
            color: "#a1a1aa",
            maxWidth: "920px",
            lineHeight: 1.4,
          }}
        >
          {SITE.description}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
