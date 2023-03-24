import React from "react";

export const ListSizes = ({ listSizes, setListSizes }) => {
  const deleteSizes = (name) => {
    const filtered = listSizes.filter((ele) => ele.name !== name);
    setListSizes([...filtered]);
  };
  return (
    <div className="relative flex flex-wrap gap-2 items-center">
      {listSizes &&
        listSizes.length > 0 &&
        listSizes.map((item, index) => (
          <div
            key={index}
            onClick={() => deleteSizes(item.name)}
            className="capitalize bg-white px-3 py-2 border cursor-pointer    ">
            {item.name}
          </div>
        ))}

      {listSizes && listSizes.length === 0 && (
        <div className="h-[40px] w-full bg-white"></div>
      )}
    </div>
  );
};
