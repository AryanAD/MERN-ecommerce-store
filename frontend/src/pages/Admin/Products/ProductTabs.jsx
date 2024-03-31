import React from "react";
import { useGetTopProductQuery } from "../../../redux/api/productApiSlice";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { CustomCSS } from "../../../components/Custom/CustomCSS";
import Ratings from "./Ratings";
import SmallProduct from "./SmallProduct";

const ProductTabs = ({
  rating,
  comment,
  product,
  userInfo,
  setRating,
  setComment,
  handleSubmit,
  loadingProductReview,
}) => {
  const { data, isLoading } = useGetTopProductQuery();

  const [activeTab, setActiveTab] = React.useState(1);

  if (isLoading) return <Loader />;

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          onClick={() => handleTabClick(1)}
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
        >
          Write Your Review
        </div>
        <div
          onClick={() => handleTabClick(2)}
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
        >
          All Reviews
        </div>
        <div
          onClick={() => handleTabClick(3)}
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
        >
          Related Products
        </div>
      </section>
      {/* Second Part */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rate Us
                  </label>
                  <select
                    required
                    id="rating"
                    value={rating}
                    className="p-2 rounded-lg border xl: w-[40rem]"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">
                      Select how you rate your experience with us!
                    </option>
                    <option value="1">Not Impressed</option>
                    <option value="2">Could Be Better</option>
                    <option value="3">Satisfactory</option>
                    <option value="4">Very Good</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Send Us A Message
                  </label>
                  <textarea
                    rows="5"
                    required
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 rounded-lg border xl:w-[40rem]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className={CustomCSS.buttonSubmit}
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to={"/login"}>sign in</Link> to write a review.
              </p>
            )}
          </div>
        )}
      </section>
      {/* Third Part */}
      <section>
        {activeTab === 2 && (
          <React.Fragment>
            <div>{product?.reviews?.length === 0 && <p> No Reviews</p>}</div>
            <div>
              {product?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="p-4 rounded-md mb-5 sm:ml-[0rem] sm:w-[24rem] xl:ml-[2rem] xl:w-[50rem] bg-green-100"
                >
                  <div className="flex justify-between">
                    <strong className="">{review?.name}</strong>
                    <p>{review?.createdAt?.substring(0, 10)}</p>
                  </div>

                  <p className="my-4">{review?.comment}</p>
                  <Ratings value={review?.rating} />
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </section>
      {/* Final Section */}
      <section>
        {activeTab === 3 && (
          <div className="ml-[4rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data?.map((product) => (
                <div key={product?._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
