import React from "react";

export const ColorList = ({ colors, setState, state }) => {
  const deleteColor = (id) => {
    const filtered = colors.filter((ele) => ele.id !== id);
    setState({ ...state, colors: filtered });
  };

  return (
    <div className="flex-wrap flex items-center gap-2">
      {colors &&
        colors.map((item) => (
          <div
            onClick={() => deleteColor(item.id)}
            className={`w-[30px] h-[30px] rounded-full`}
            style={{ background: item.color }}
            key={item.id}></div>
        ))}

      {colors && colors.length === 0 && (
        <div className="h-[40px] w-full bg-white"></div>
      )}
    </div>
  );
};
