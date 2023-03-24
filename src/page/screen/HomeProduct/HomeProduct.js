import { Link } from "react-router-dom";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { useGetProductCategoryQuery } from "../../../service/productService";

export const HomeProduct = ({ category, homepage }) => {
  const { data } = useGetProductCategoryQuery({
    name: category.title,
    page: "",
  });
  return (
    <div className={"bg-white p-5 -mx-5 rounded-lg"}>
      <div className="flex items-center justify-between mb-5">
        <span className="uppercase text-blue-500 font-bold text-xl  font-v3">{category.title}</span>
        <Link to={`/category-product/${category.title}`}>
          <span className="text-md ff">See All</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data &&
          data.product.length > 0 &&
          data.product.map((pro) => (
            <ProductCard
              pro={pro}
              key={pro._id}
              homepage={homepage}></ProductCard>
          ))} 
      </div>
    </div>
  );
};
