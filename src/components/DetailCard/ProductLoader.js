import React from "react";
import { Skeleton } from "../LoadingSkeleton/Skeleton";
import { TextSketelon } from "../LoadingSkeleton/TextSketelon";
import { Thumbnail } from "../LoadingSkeleton/Thumbnail";

export const ProductLoader = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-[40%] px-5 -mx-5">
          <Skeleton>
            <Thumbnail height={"350px"}></Thumbnail>
          </Skeleton>
        </div>
        <div className="w-full md:w-[60%] px-5 -mx-5">
          <Skeleton>
            <Thumbnail height={"250px"}></Thumbnail>
            <TextSketelon height={"15px"}></TextSketelon>
            <TextSketelon height={"15px"}></TextSketelon>
            <TextSketelon height={"15px"}></TextSketelon>
          </Skeleton>
        </div>
      </div>
    </>
  );
};
