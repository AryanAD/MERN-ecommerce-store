import React from "react";
import { useGetTopProductQuery } from "../../../redux/api/productApiSlice";
import Loader from "../../../components/Loader";

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
    </div>
  );
};

export default ProductTabs;
