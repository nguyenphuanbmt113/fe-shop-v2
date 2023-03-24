import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetOrderUserQuery } from "../../service/orderUserService";
import { discount } from "../../ulties/discount";
import currency from "currency-formatter";
import { Spinner } from "../../components/Spinner/Spinner";
export const OrderUser = () => {
  let { page } = useParams();
  const dataUser = useSelector((state) => state.authReducer.userTokenVerify);
  if (page) page = 1;
  const { data, isFetching } = useGetOrderUserQuery({
    page,
    userId: dataUser._id,
  });
  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="m-4">
          <div className="p-3 bg-white rounded-md">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Tên</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Giá cả</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Số lượng mua
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Màu</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Kích thước</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Hình ảnh minh họa
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Tổng giá thanh toán
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Thông tin</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data &&
                    data?.orders.map((item, index) => {
                      const total = currency.format(
                        discount(
                          item.productId.price,
                          item.productId.discount
                        ) * item.quantities,
                        {
                          code: "USD",
                        }
                      );
                      const price = currency.format(item.productId.price, {
                        code: "USD",
                      });
                      return (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="text-left font-medium text-gray-500">
                              {item.productId.title}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="text-left font-medium text-gray-500">
                              {price}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="text-left font-medium text-gray-500">
                              {item?.quantities}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div
                              className="w-[20px] h-[20px] rounded-full"
                              style={{
                                backgroundColor: item.color,
                              }}></div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="text-left font-medium text-gray-500">
                              {item?.size}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="">
                              <img
                                src={`/images/${item.productId.image1}`}
                                alt={item.productId.title}
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <div className="text-left font-medium text-gray-500">
                              {currency.format(total, { code: "USD" })}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap text-black text-md">
                            <Link
                              to={`/user/detail-order/${item._id}`}
                              className="px-2 py-1 bg-yellow-500 text-white rounded-md font-medium text-center">
                              Chi tiết
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
