import React from "react";
import { Skeleton } from "../LoadingSkeleton/Skeleton";
import { Thumbnail } from "../LoadingSkeleton/Thumbnail";
import { TextSketelon } from "../LoadingSkeleton/TextSketelon";
export const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item}>
          <Thumbnail height="250px"></Thumbnail>
          <TextSketelon height="10px"></TextSketelon>
        </Skeleton>
      ))}
    </div>
  );
};
