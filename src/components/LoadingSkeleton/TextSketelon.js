import React from "react";
import { Animation } from "./Animation";

export const TextSketelon = ({height}) => {
  return (
    <div
      className={`w-full rounded-sm bg-gray-300 overflow-hidden relative mt-3`}
      style={{
        height: height,
      }}>
      <Animation></Animation>
    </div>
  );
};
