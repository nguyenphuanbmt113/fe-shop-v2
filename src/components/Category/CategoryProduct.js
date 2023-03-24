import React from "react";
import { useGetAllCategoryQuery } from "../../service/categoryService";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Category.scss";
import { Skeleton } from "../LoadingSkeleton/Skeleton";
import { Thumbnail } from "../LoadingSkeleton/Thumbnail";
import { useNavigate } from "react-router-dom";
SwiperCore.use([Virtual, Navigation, Pagination]);
export const CategoryProduct = () => {
  const { data, isFetching } = useGetAllCategoryQuery();
  const navigate = useNavigate();
  const handleRouteCate = (title) => {
    navigate(`/category-product/${title}`);
  };
  return isFetching ? (
    <div className="flex flex-wrap justify-between">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          className="w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12"
          key={item}>
          <Skeleton>
            <Thumbnail height={"50px"}></Thumbnail>
          </Skeleton>
        </div>
      ))}
    </div>
  ) : (
    data.caterories.length > 0 && (
      <Swiper
        slidesPerView={5}
        spaceBetween={50}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1080: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        virtual
        className="w-full">
        {data?.caterories?.map((category, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleRouteCate(category.title)}
            virtualIndex={index}
            className="w-full overflow-hidden">
            {category.title}
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};
