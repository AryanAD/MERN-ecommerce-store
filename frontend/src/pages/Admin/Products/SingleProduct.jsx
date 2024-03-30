import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../../redux/api/productApiSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  FaBox,
  FaCartPlus,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { ImArrowLeft } from "react-icons/im";
import moment from "moment";
import HeartIcon from "./favorites/HeartIcon";
import {
  Container,
  Toolbar,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";
import { CustomSnippets } from "../../../components/Custom/CustomSnippets";
import { CustomCSS } from "../../../components/Custom/CustomCSS";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.90)",
    color: theme.palette.common.white,
    borderRadius: 8,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    lineSpacing: 1.5,
    maxWidth: 600,
  },
}));

const SingleProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <Container maxWidth="xl">
      <Toolbar />

      <div className={CustomCSS.headingContainer}>
        {CustomSnippets.Heading({
          heading: `Single Product`,
        })}
        <Link to="/">
          <button className={CustomCSS.buttonSubmit}>
            <ImArrowLeft />
            Back
          </button>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <>
          <div className="flex justify-around flex-wrap relative items-stretch">
            <div>
              <img
                src={product?.image}
                alt={product?.name}
                className=" rounded-md w-full sm:w-[20rem] md:w-[30rem] lg:w-[45rem] xl:w-[50rem]"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product?.name}</h2>
              <LightTooltip title={product?.description}>
                <p className="my-2 md:w-[30rem] lg: w-[35rem] xl:w-[35rem]">
                  {product?.description.slice(0, 500)}...
                </p>
              </LightTooltip>

              <p className="text-5xl my-4 font-extrabold">${product?.price}</p>

              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="flex items-center mb-5">
                    <FaStore className="mr-2" /> Brand: {product?.brand}
                  </h1>
                  <h1 className="flex items-center mb-5">
                    <FaClock className="mr-2" /> Added:
                    {moment(product?.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-5">
                    <FaStar className="mr-2" /> Reviews: {product?.numReviews}
                  </h1>
                </div>

                <div>
                  <h1 className="flex items-center mb-5">
                    <FaStar className="mr-2" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-5">
                    <FaShoppingCart className="mr-2" /> Quantity:{" "}
                    {product?.quantity}
                  </h1>
                  <h1 className="flex items-center mb-5">
                    <FaBox className="mr-2" /> In Stock: {product?.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap justify-between w-full">
                <Ratings
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                  color={"orange"}
                />

                {product?.countInStock > 0 && (
                  <div>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg"
                    >
                      {[...Array(product?.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex mt-3">
                <button
                  // onClick={handleAddToCard}
                  disable={product?.countInStock === 0}
                  className={CustomCSS.buttonSubmit}
                >
                  <FaCartPlus />
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="mt-[5rem] ml-[10rem] container flex flex-wrap items-start justify-between">
              <ProductTabs
                rating={rating}
                comment={comment}
                product={product}
                userInfo={userInfo}
                setRating={setRating}
                setComment={setComment}
                // handleSubmit={handleSubmit}
                loadingProductReview={loadingProductReview}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleProduct;
