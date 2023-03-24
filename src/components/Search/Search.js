import currencyFormatter from "currency-formatter";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchbar } from "../../redux/reducers/globalReducer";
import { useGetProductSearchQuery } from "../../service/productService";
export const Search = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { data } = useGetProductSearchQuery({
    keyword: value,
  });

  console.log("data:", data);
  const handleClose = () => {
    dispatch(toggleSearchbar());
  };
  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    navigate(`/search/${value}/1`);
    dispatch(toggleSearchbar());
  };
  const entertosearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      navigate(`/search/${value}/1`);
      dispatch(toggleSearchbar());
    }
  };
  const handlerClickProduct = (item) => {
    navigate(`/product/${item._id}`);
    dispatch(toggleSearchbar());
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[10] w-full h-full">
      <div className="flex items-center justify-center">
        <div className="sm:w-9/12 md:w-8/12 lg:w-6/12 p-8 pb-5 relative">
          <input
            type="text"
            className="w-full h-[60px] px-5 py-2 outline-none bg-white rounded-md uppercase"
            placeholder="Tìm kiếm sản phẩm"
            value={value}
            onClick={entertosearch}
            onChange={handleChangeInput}
          />
          <div
            className="absolute top-1/2 right-[50px] -translate-y-1/2 cursor-pointer"
            onClick={() => handleSearch()}>
            <BsSearch size={25}></BsSearch>
          </div>
        </div>
      </div>
      <div className="absolute top-5 right-7" onClick={handleClose}>
        <TiDeleteOutline size={35} color="white"></TiDeleteOutline>
      </div>
      {data && data.product.length > 0 && (
        <div className="p-3 bg-white w-[660px] mx-auto rounded-lg max-h-[400px] flex flex-col overflow-y-auto">
          {data &&
            data.product &&
            data.product.map((item) => {
              console.log("item:", item);
              const percentage = item.discount / 100;
              const discountPrice = item.price - item.price * percentage;
              return (
                <div
                  className="flex items-start gap-3 p-3 rounded-md border-b"
                  onClick={() => handlerClickProduct(item)}>
                  <div className="w-[50px]">
                    <img
                      src={`/images/${item.image1}`}
                      alt=""
                      className="w-full h-full rounded-md"
                    />
                  </div>
                  <div className="text-sm">
                    <span>{item.title}</span>
                    <div className="flex items-center justify-between">
                      <div className="mt-2 text-sm font-nomal font-medium">
                        {currencyFormatter.format(discountPrice, {
                          code: "USD",
                        })}
                      </div>
                      <div className="mt-3 text-sm font-nomal line-through font-medium">
                        {currencyFormatter.format(item.price, {
                          code: "USD",
                        })}
                      </div>
                    </div>
                  </div>
                </div>  
              );
            })}
        </div>
      )}
    </div>
  );
};
