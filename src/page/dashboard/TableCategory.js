import React from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import { useDeleteCategoryMutation } from "../../service/categoryService";

export const TableCategory = React.memo(({ data, isLoading }) => {
  const [removeItem] = useDeleteCategoryMutation();
  const handleDelete = (id) => {
    if (window.confirm("Are you really want to delete")) {
      removeItem({ id });
    }
  };
  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Danh mục phân loại</h2>
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
                    <div className="font-semibold text-left">Thao tác</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data &&
                  data?.caterories.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2 whitespace-nowrap text-black text-md">
                        <div className="text-left font-medium text-gray-500">
                          {item.title}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-black text-md flex items-center gap-3">
                        <div className="cursor-pointer px-3 py-2 bg-blue-500 text-white rounded-sm">
                          Chỉnh sửa
                        </div>
                        <div
                          className=" cursor-pointer px-3 py-2 bg-red-500 text-white rounded-sm"
                          onClick={() => handleDelete(item._id)}>
                          Xóa
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isLoading ? (
              <div className="my-8 flex items-center justify-center">
                <Spinner></Spinner>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
});
