import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200x630 share card used for Open Graph, Twitter and schema images. */
export function renderOgImage({
  title,
  eyebrow,
  footer = "goinsight.in",
}: {
  title: string;
  eyebrow?: string;
  footer?: string;
}) {
  const fontSize = title.length > 80 ? 52 : title.length > 50 ? 60 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #101624 0%, #131926 60%, #1d2638 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ecc41a",
              color: "#101624",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>GoInsight</div>
          {eyebrow ? (
            <div
              style={{
                marginLeft: 24,
                padding: "8px 20px",
                borderRadius: 999,
                border: "2px solid #ecc41a",
                color: "#ecc41a",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1 }}>
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#c9ced8",
          }}
        >
          <div style={{ display: "flex" }}>Data Analytics · Power BI · AI/ML Consulting</div>
          <div style={{ display: "flex", color: "#ecc41a", fontWeight: 700 }}>{footer}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
