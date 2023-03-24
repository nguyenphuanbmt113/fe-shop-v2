import React, { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { FiEye } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ColorList } from "../../components/Color/Color";
import { ListSizes } from "../../components/ListSize/ListSize";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAllCategoryQuery } from "../../service/categoryService";
import h2p from "html2plaintext";
import {
  useGetProductByIdQuery,
  usePutProductMutation,
} from "../../service/productService";
export const ProductEdit = () => {
  const { id } = useParams();
  const { data: productDataUpdate, isFetching: isFetchingDataUpdate } =
    useGetProductByIdQuery(id);
  const [state, setState] = useState({
    title: "",
    price: 0,
    stock: 0,
    discount: 0,
    category: "",
    colors: [],
    description: "",
  });

  const navigate = useNavigate();
  const [listSizes, setListSizes] = useState([]);
  const [value, setValue] = useState("");
  const [sizes] = useState([
    {
      name: "xsm",
    },
    {
      name: "sm",
    },
    {
      name: "md",
    },
    {
      name: "lg",
    },
    {
      name: "xl",
    },
  ]);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  //call data
  const { data, isFetching } = useAllCategoryQuery();
  const [putProduct] = usePutProductMutation();

  //choose Color
  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  //choose sizes
  const chooseSizes = (item) => {
    const filtered = listSizes.filter((ele) => ele.name !== item.name);
    setListSizes([...filtered, item]);
  };
  //handle submit
  const updateProduct = async (e) => {
    putProduct({ ...state, _id: id, sizes: listSizes });
    navigate(`/dashboard/product`);
  };

  useEffect(() => {
    if (!isFetchingDataUpdate) {
      setState(productDataUpdate);
      setListSizes(productDataUpdate?.sizes);
      setValue(h2p(productDataUpdate?.description));
    }
  }, [isFetchingDataUpdate, productDataUpdate]);
  useEffect(() => {
    setState({ ...state, description: value });
  }, [value]);
  return (
    <div>
      <Link
        to="/dashboard/product"
        className="inline-flex items-center gap-3 px-3 py-2 bg-blue-500 text-white rounded-sm">
        <span>Danh sách sản phẩm</span>
        <FiEye></FiEye>
      </Link>
      {!isFetchingDataUpdate ? (
        <div className="mt-8">
          <div className="block uppercase tracking-wide text-blue-500 text-2xl font-bold mb-2">
            Chỉnh sửa sản phẩm
          </div>
          <div className="w-full max-w-2lg">
            <div className="flex -mx-3 mb-2">
              <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Giá cả
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-200"
                  type="text"
                  name="price"
                  value={state.price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  List Color
                </label>
                <ColorList
                  colors={state?.colors}
                  state={state}
                  setState={setState}></ColorList>
              </div>
            </div>
            <div className="flex -mx-3 mb-2">
              <div className="w-full md:w-full px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discount
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
                  type="text"
                  name="discount"
                  value={state.discount}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Số lượng lưu trữ
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500"
                  type="text"
                  name="stock"
                  value={state.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  List Sizes
                </label>
                <ListSizes
                  listSizes={listSizes}
                  setListSizes={setListSizes}></ListSizes>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Category
                  </label>
                  <div className="relative">
                    {!isFetching ? (
                      data?.caterories?.length > 0 && (
                        <select
                          className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500"
                          value={state.category}
                          name="category"
                          defaultValue={data?.caterories[1].title}
                          onChange={handleChange}>
                          <option>Choose Category</option>
                          {data?.caterories.length > 0 &&
                            data?.caterories.map((item) => (
                              <option key={item._id} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                        </select>
                      )
                    ) : (
                      <Spinner></Spinner>
                    )}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Choose Color
                  </label>
                  <TwitterPicker onChangeComplete={saveColors} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Choose Sizes
                  </label>
                  <div className="relative flex flex-wrap gap-2 items-center">
                    {sizes &&
                      sizes.length > 0 &&
                      sizes.map((item, index) => (
                        <div
                          key={index}
                          className="capitalize bg-white px-3 py-2 border cursor-pointer    "
                          onClick={() => chooseSizes(item)}>
                          {item.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Description
                  </label>
                  <div className="relative">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={updateProduct}
              className="px-3 py-2 bg-blue-500 text-white rounded-sm">
              Chỉnh sửa sản phẩm
            </button>
          </div>
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
};
