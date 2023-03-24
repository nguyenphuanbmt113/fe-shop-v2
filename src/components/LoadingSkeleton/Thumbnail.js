import React from "react";
import { Animation } from "./Animation";

export const Thumbnail = ({ height }) => {
  return (
    <div
      className={`w-full  bg-gray-300 overflow-hidden relative`}
      style={{
        height: height,
      }}>
      <Animation></Animation>
    </div>
  );
};
