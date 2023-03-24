import React from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../../components/Footer/Footer";
import { Skeleton } from "../../../components/LoadingSkeleton/Skeleton";
import { TextSketelon } from "../../../components/LoadingSkeleton/TextSketelon";
import { Thumbnail } from "../../../components/LoadingSkeleton/Thumbnail";
import { NavHome } from "../../../components/NavHome/NavHome";
import { Pagination } from "../../../components/Pagination/Pagination";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { useGetProductSearchQuery } from "../../../service/productService";

export const SearchProduct = () => {
  const { page = 1, keyword } = useParams();
  const { data, isLoading } = useGetProductSearchQuery({
    keyword,
    page,
  });
  return (
    <>
      <NavHome detailpage="detailpage"></NavHome>
      {isLoading ? (
        <div className="my-container grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div>
          <span className="mt-3 my-container px-5 block text-lg">
            {data?.count} Products found in{" "}
            <span className="text-blue-400">#{keyword}</span>
          </span>
          {data && (
            <div className="my-container px-5">
              <Pagination
                page={parseInt(page)}
                totalPage={parseInt(data?.totalPage)}
                path={`search/${keyword}`}
                count={data?.count}></Pagination>
            </div>
          )}
          <div className="px-5 mt-5 my-container grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data &&
              data.product.map((pro) => (
                <ProductCard key={pro._id} pro={pro}></ProductCard>
              ))}
          </div>
        </div>
      ) : (
        <div className="px-3 py-3 bg-white text-red-500">
          <span className="block my-container px-5">
            Không có sãn phẩm, xin vui lòng cảm ơn quý khách
          </span>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};
