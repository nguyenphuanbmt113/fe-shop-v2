import React from "react";
import { CategoryProduct } from "../../../components/Category/CategoryProduct";
import { Footer } from "../../../components/Footer/Footer";
import { HomeSkeleton } from "../../../components/HomeSkeleton/HomeSkeleton";
import { NavHome } from "../../../components/NavHome/NavHome";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";
import { SwiperSlider } from "../../../components/Swiper/Swiper";
import { useGetRanCategoryQuery } from "../../../service/categoryService";
import { HomeProduct } from "../HomeProduct/HomeProduct";

export const Home = () => {
  const { data, isFetching } = useGetRanCategoryQuery();

  return (
    <div className="relative">
      <div>
        <NavHome></NavHome>
        <div>
          <SwiperSlider></SwiperSlider>
        </div>
        <div className="">
          <div className="my-container px-5">
            <CategoryProduct></CategoryProduct>
          </div>
        </div>
      </div>
      {!isFetching ? (
        data.caterories.length > 0 &&
        data?.caterories?.map((category, index) => (
          <div className="my-bigcontainer px-5 mt-[30px]" key={category._id}>
            <HomeProduct category={category} homepage={true}></HomeProduct>
          </div>
        ))
      ) : (
        <div className="my-container px-5">
          <HomeSkeleton></HomeSkeleton>
        </div>
      )}
      <div>
        <Footer></Footer>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};
