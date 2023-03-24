import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import {
  useGetDetailOrderUserQuery,
  usePostReviewMutation,
} from "../../../service/orderUserService";
import { discount } from "../../../ulties/discount";
export const DetailOrder = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetDetailOrderUserQuery(id);
  const [postReview, response] = usePostReviewMutation();
  const [state, setState] = useState({
    rating: 0,
    mes: "",
  });
  const handleChangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  let details = data?.details || {};
  const total =
    discount(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities;
  const addReview = () => {
    postReview({
      ...state,
      userId: data?.details?.userId?._id,
      productId: data?.details?.productId?._id,
      orderId: data?.details._id,
    });
  };
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response?.data?.mes);
    }
  }, [response?.data?.mes, response.isSuccess]);
  return (
    <div className="m-3">
      {!isFetching ? (
        <div>
          <span className="inline-block mb-3 font-lg font-bold p-2 bg-white rounded-md">
            Order Number: #{details._id}
          </span>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 items-start">
            <div className="lg:col-span-3 bg-white p-3 rounded-md">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-white">
                  <tr>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Hình ảnh</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Số lượng mua
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Giá cả</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Tổng giá</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 whitespace-nowrap text-black text-md">
                      <div className="text-left font-medium text-gray-500">
                        <img
                          src={`/images/${data?.details?.productId?.image1}`}
                          alt="name"
                          className="w-[50px] h-[50px] rounded-md object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-black text-md">
                      <div className="text-left font-medium text-gray-500">
                        {" "}
                        {data?.details?.quantities}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-black text-md">
                      <div className="text-left font-medium text-gray-500">
                        {currency.format(
                          discount(
                            data?.details?.productId?.price,
                            data?.details?.productId?.discount
                          ),
                          { code: "USD" }
                        )}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-black text-md">
                      <div className="text-left font-medium text-gray-500">
                        {currency.format(total, { code: "USD" })}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="px-2 py-2 bg-gray-400 text-white mt-3 text-center">
                Đánh giá sản phẩm
              </div>
              <div className="text-white mt-3">
                <div action="" className="grid grid-cols-1 gap-3">
                  <div className="text-black flex flex-col">
                    <label htmlFor="ratings"></label>
                    <select
                      name="rating"
                      value={state?.rating}
                      onChange={handleChangeInput}
                      id=""
                      className="p-2 border">
                      <option>Đánh giá sao cho sản phẩm</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <textarea
                    name="mes"
                    value={state.mes}
                    onChange={handleChangeInput}
                    id=""
                    cols="30"
                    rows="10"
                    className="border p-2 text-black"
                    placeholder="Lời nhắn nhủ mùa thu"></textarea>
                  <div
                    className="cursor-pointer px-3 py-2 bg-blue-500 text-white w-[100px] text-center rounded-md"
                    onClick={addReview}>
                    {response?.isLoading === true ? "Loading..." : "Submit"}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 bg-white p-3 rounded-md">
              <div className="border-b pb-3 border-b-gray-300">
                <span className="capitalize text-gray-500 font-bold">
                  Nguười Đặt Hàng
                </span>
                <span className="text-blue-400 text-base font-bold capitalize mt-2 block">
                  {data?.details?.userId?.firstname}{" "}
                  {data?.details?.userId?.lastname}
                </span>
              </div>

              <div className="border-b py-3 border-b-gray-300">
                <h4 className="capitalize text-gray-500 font-bold">
                  Tên Sản Phẩm
                </h4>
                <span className="text-blue-400 text-base font-bold capitalize mt-2 block">
                  {data?.details?.productId?.title}
                </span>
              </div>
              <div className="py-3">
                <h4 className="capitalize text-gray-500 font-bold">
                  Địa Chỉ Nhận Hàng
                </h4>
                <div className="mt-2">
                  <span className="text-blue-400 text-base font-bold capitalize mt-2 block">
                    {data?.details?.address?.city},{" "}
                    {data?.details?.address?.line1},{" "}
                    {data?.details?.address?.line2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
};
