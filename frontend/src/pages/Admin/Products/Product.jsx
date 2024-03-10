import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-[30rem] rounded-lg"
        />  
        {/* <HeartIcon product={product} /> */}
      </div>

      <div className="p-4">
        <Link to={`/products/${product}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product?.name}</div>
            <span className="bg-green-100 text-green-900 text-md font-medium mr-2 px-3 py-0.5 rounded-full">
              ${product?.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
