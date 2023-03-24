import React from "react";
import { useGetReviewQuery } from "../../service/orderUserService";
import moment from "moment";
export const CommentSection = ({ productId }) => {
  const { data } = useGetReviewQuery(productId);
  const dataReview = data?.productReviews;
  return (
    <>
      <h3 className="text-lg pb-3 border-b border-gray-300 font-bold">
        Đánh giá về sản phẩm
      </h3>
      {dataReview &&
        dataReview.length > 0 &&
        dataReview.map((item) => {
          return (
            <div
              className="p-4 flex gap-5 mb-3  bg-gray-100 rounded-md"
              key={item._id}>
              <div className="w-[50px] h-[50px] rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1679163096312-4edfbfbe2a73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-md">
                    {item?.user?.firstname} {item?.user?.lastname}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {moment(item?.updatedAt).format("MMM Do YY")}
                  </span>
                </div>
                <div className="text-sm">{item.comment}</div>
                <span className="text-[10px] text-gray-400">Phản hồi</span>
              </div>
            </div>
          );
        })}
      {+dataReview?.length === 0 ? (
        <p className="my-3 text-gray-400">
          Chưa có đánh giá nào cho sản phẩm này
        </p>
      ) : (
        ""
      )}
    </>
  );
};
