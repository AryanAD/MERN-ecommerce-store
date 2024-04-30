import { useGetTopProductQuery } from "../../../redux/api/productApiSlice";
import Message from "../../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products?.map((product, { _id }) => (
            <div key={_id}>
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full rounded-lg object-cover h-[30rem]"
              />

              <div className="flex justify-between w-[20rem]">
                <div>
                  <h2>{product?.name}</h2>
                  <p>${product?.price}</p>

                  <br />
                  <br />

                  <p className="w-[23rem]">
                    {product?.description?.substring(0, 170)}...
                  </p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <h1 className="flex items-center mb-6 w-[18rem]">
                      <FaStore className="mr-2" /> Brand: {product?.brand}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[18rem]">
                      <FaClock className="mr-2" /> Added At:{" "}
                      {moment(product?.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[18rem]">
                      <FaStar className="mr-2" /> Reviews: {product?.numReviews}
                    </h1>
                  </div>

                  <div>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaStar className="mr-2" />
                      Ratings: {Math.round(product?.rating)}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaShoppingCart className="mr-2" />
                      Quantity: {product?.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaBox className="mr-2" />
                      In Stock: {product?.countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
