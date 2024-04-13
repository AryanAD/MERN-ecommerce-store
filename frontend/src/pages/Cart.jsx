import React from "react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { CustomCSS } from "../components/Custom/CustomCSS";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to={"/shop"}>Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item?._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`product/${item?._id}`}>{item?.name}</Link>
                    <div className="mt-2">{item?.brand}</div>
                    <div className="mt-2 font-bold">${item?.price}</div>
                  </div>

                  <div className="w-24">
                    <select
                      value={item?.quantity}
                      onChange={(e) =>
                        handleAddToCart(item, Number(e.target.value))
                      }
                      className="w-full p-1 border rounded-md"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => handleRemoveFromCart(item?._id)}
                    >
                      <FaTrash className="ml-[1rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items (
                    {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
                    {""}items)
                  </h2>

                  <div className="text-2xl font-bold mb-3">
                    $
                    {cartItems
                      ?.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      ?.toFixed(2)}
                  </div>

                  <button
                    className={CustomCSS.buttonSubmit}
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    <HiMiniShoppingCart /> Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
