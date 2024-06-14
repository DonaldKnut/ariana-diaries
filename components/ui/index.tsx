"use client";

import { Rings } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Rings
        height={120}
        width={120}
        color="#FFD700" // Dark orange color
      />
    </div>
  );
}
