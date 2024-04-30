import ProductCarousel from "../pages/Admin/Products/ProductCarousel";
import SmallProduct from "../pages/Admin/Products/SmallProduct";
import { useGetTopProductQuery } from "../redux/api/productApiSlice";
import { CustomCSS } from "./Custom/CustomCSS";
import Loader from "./Loader";
import Message from "./Message";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="error">{error.message}</Message>;
  }
  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className={CustomCSS.gridTwo}>
            {data.map((product) => (
              <div key={product?._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
