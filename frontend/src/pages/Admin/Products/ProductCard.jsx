import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HeartIcon from "./favorites/HeartIcon";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Item Successfully Added To Cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  return (
    <div className="max-w-sm relative bg-white-300 rounded-lg shadow-md">
      <section className="relative">
        <Link to={`/products/${product?._id}`}>
          <span className="absolute bottom-3 right-3 bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {product?.brand}
          </span>
          <img
            src={product?.image}
            alt={product?.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl">{product?.name}</h5>
          <p className="font-semibold text-green-500">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <p className="mb-3 font-normal text-slate-500">
          {product?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/products/${product?._id}`}
            className="inline-flex items-center px-3 py-2 text-sm text-white font-medium text-center bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M1 5h12m0 0L8 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-md"
            onClick={() => handleAddToCart(product, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
