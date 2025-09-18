import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../../redux/api/productApiSlice";
import AdminMenu from "../AdminMenu";
import { Container, Toolbar } from "@mui/material";
import { CustomSnippets } from "../../../components/Custom/CustomSnippets";
import { CustomCSS } from "../../../components/Custom/CustomCSS";
import Loader from "../../../components/Loader";

const ListProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-600">Error loading products!!!</div>;
  }

  return (
    <Container maxWidth="xl">
      {CustomSnippets.Heading({
        heading: `Product List (${products?.length})`,
      })}
      <AdminMenu />
      <Toolbar />

      <div className={CustomCSS.gridTwo}>
        {products.map((product) => (
          <Link key={product?._id} to={`/admin/product-update/${product?._id}`}>
            <div className="flex w-full pr-3 border rounded-lg drop-shadow-lg">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-[11rem] h-[11rem] object-cover object-center"
              />
              <div className="flex flex-col justify-around p-4">
                <div className="flex justify-between">
                  <h5 className="mb-2 text-xl font-semibold">
                    {product?.name?.substring(0, 35)}...
                  </h5>

                  <p className="text-xs text-gray-400">
                    {moment(product?.createdAt).format("D-MMMM, YYYY")}
                  </p>
                </div>

                <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                  {product?.description?.substring(0, 200)}...
                </p>

                <div className="flex justify-between">
                  <Link
                    to={`/admin/product-update/${product?._id}`}
                    className={CustomCSS.buttonUpdate}
                  >
                    Update Product
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                  <p>${product?.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default ListProducts;
