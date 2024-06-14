"use client";

import { Rings } from "react-loader-spinner";

export default function Spinner() {
  return (
    <Rings
      height={"120"}
      width={"120"}
      ariaLabel="Common Loader"
      wrapperStyle={{ display: "block", margin: "auto", color: "orange" }}
    />
  );
}
