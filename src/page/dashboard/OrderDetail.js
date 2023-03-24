import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailOrderQuery } from "../../service/orderService";
import { discount } from "../../ulties/discount";
import currency from "currency-formatter";
import { AiOutlinePrinter } from "react-icons/ai";
import { Spinner } from "../../components/Spinner/Spinner";
export const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetDetailOrderQuery(id);
  let details = data?.details || {};
  const total =
    discount(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities;
  const toBackOrder = () => {
    navigate("/dashboard/order");
  };
  return (
    <>
      {!isFetching ? (
        <div>
          <span className="inline-block mb-3 font-lg font-bold p-2 bg-white text-gray-500 rounded-md">
            Order Number: #{details._id}
          </span>
          <div className="mb-4 flex items-center gap-4 text-white">
            <span
              className="px-2 py-1 cursor-pointer bg-green-500 rounded-md"
              onClick={toBackOrder}>
              Trở Về
            </span>
            <span className="px-2 py-1 cursor-pointer bg-blue-500 rounded-md">
              <AiOutlinePrinter size={20}></AiOutlinePrinter>
            </span>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 items-start">
            <div className="lg:col-span-3 bg-white p-3 rounded-md">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-white bg-gray-500 ">
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
    </>
  );
};
