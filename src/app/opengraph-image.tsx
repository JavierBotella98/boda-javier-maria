import { ImageResponse } from "next/og";
import { couple, wedding, ceremony } from "@/config/site-content";

export const alt = `Boda de ${couple.displayNames}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf6ef",
          backgroundImage:
            "linear-gradient(135deg, #d9ab9b33 0 25%, transparent 25% 50%, #ddc39433 50% 75%, transparent 75% 100%)",
          backgroundSize: "160px 160px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b6156",
          }}
        >
          Nos casamos
        </div>
        <div
          style={{
            fontSize: 110,
            color: "#3a332c",
            marginTop: 16,
            display: "flex",
            flexDirection: "row",
            gap: 24,
          }}
        >
          <span>{couple.groomFirstName}</span>
          <span style={{ color: "#b25b45" }}>&</span>
          <span>{couple.brideFirstName}</span>
        </div>
        <div style={{ fontSize: 32, color: "#6b6156", marginTop: 24 }}>
          {`${wedding.dateLabel} · ${ceremony.name}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
