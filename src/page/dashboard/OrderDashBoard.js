import { Link, useParams } from "react-router-dom";
import React from "react";
import { useGetOrderQuery } from "../../service/orderService";
import { Spinner } from "../../components/Spinner/Spinner";
import { Pagination } from "../../components/Pagination/Pagination";

export const OrderDashBoard = () => {
  let { page } = useParams();
  if (!page) page = 1;
  const { data, isFetching } = useGetOrderQuery(page);
  return (
    <>
      {!isFetching && data && data?.orders.length > 0 && (
        <div className="mt-5 w-full bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Đã đặt hàng</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Tên</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Số lượng mua
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">image</div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Khách hàng đã nhận đơn
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">
                        Hình trạng vận chuyển
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap text-black text-md">
                      <div className="font-semibold text-left">Chi tiết</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.orders?.map((order) => (
                    <tr key={order._id}>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <div className="text-left font-medium text-gray-500">
                          {order?.productId?.title}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <div className="text-left font-medium text-gray-500">
                          {order?.quantities}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <img
                          src={`/images/${order?.productId?.image1}`}
                          alt="name"
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-lg object-cover"
                        />
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <div className="text-left font-medium text-gray-500">
                          {order.received ? "Yes" : "No"}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <div className="text-left font-medium text-gray-500">
                          {order.status ? "Yes" : "No"}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-sm">
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              totalPage={data.totalPage}
              count={data.count}
              path="dashboard/order"
            />
          </div>
        </div>
      )}
      {data?.orders.length === 0 && (
        <div className="flex items-center justify-center bg-white text-red-500 p-2">
          Chưa có sản phẩm được đặt hàng
        </div>
      )}
    </>
  );
};
