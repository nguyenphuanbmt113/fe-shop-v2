import React from "react";
import "./Toggle.scss";
export const Toggle = () => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </>
  );
};
