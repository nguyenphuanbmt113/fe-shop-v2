import React from "react";
import { Skeleton } from "../../components/LoadingSkeleton/Skeleton";
import { TextSketelon } from "../../components/LoadingSkeleton/TextSketelon";
import { Thumbnail } from "../../components/LoadingSkeleton/Thumbnail";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useGetProductCategoryQuery } from "../../service/productService";

export const RelativeProduct = ({ name }) => {
  const { data, isLoading } = useGetProductCategoryQuery({ name });
  return (
    <div className="">
      {isLoading ? (
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div className="" key={item}>
              <Skeleton>
                <Thumbnail height="250px"></Thumbnail>
                <TextSketelon height="20px"></TextSketelon>
                <TextSketelon height="20px"></TextSketelon>
              </Skeleton>
            </div>
          ))}
        </div>
      ) : data.product.length > 0 ? (
        <div className="bg-white rounded-md">
          <div className="font-bold mt-4 p-3 bg-white rounded-md text-lg">
            Sản phẩm có liên quan
          </div>
          <div className="px-3 pb-6">
            <div className="my-container grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.product.slice(0, 8).map((pro) => (
                <ProductCard key={pro._id} pro={pro}></ProductCard>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 py-3 bg-white text-red-500">
          <span className="block my-container px-5">
            Không có sãn phẩm, xin vui lòng cảm ơn quý khách
          </span>
        </div>
      )}
    </div>
  );
};
