import { Link } from "react-router-dom";
import { CustomCSS } from "../../../components/Custom/CustomCSS";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-auto rounded-lg"
        />
        {/* <HeartIcon product={product} /> */}

        <div className="p-54">
          <Link to={`/product/${product?._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product?.name}</div>
              <span className={CustomCSS.inputLabel}>${product?.price}</span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
