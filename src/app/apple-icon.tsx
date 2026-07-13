import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(45deg)",
            backgroundColor: "#b25b45",
          }}
        >
          <div
            style={{
              transform: "rotate(-45deg)",
              color: "#faf6ef",
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            J&M
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
