import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { CustomCSS } from "../../components/Custom/CustomCSS";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { error, isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart?.cartItems,
        shippingAddress: cart?.shippingAddress,
        paymentMethod: cart?.paymentMethod,
        itemsPrice: cart?.itemsPrice,
        taxPrice: cart?.taxPrice,
        shippingPrice: cart?.shippingPrice,
        totalPrice: cart?.totalPrice,
      }).unwrap();

      dispatch(clearCart());
      toast.success("Order placed successfully");
      navigate(`/order/${res?._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [cart?.shippingAddress?.address, navigate]);

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container h-[80vh] bg-neutral-50 p-4 mx-auto mt-8 border-gray-200 rounded-md shadow-zinc-200   shadow-sm drop-shadow-sm">
        {cart?.cartItems?.length === 0 ? (
          <Message message="Your cart is empty" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left align-top">Product</td>
                  <td className="px-1 py-2 text-left align-top">Price</td>
                  <td className="px-1 py-2 text-left align-top">Quantity</td>
                  <td className="px-1 py-2 text-left align-top">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart?.cartItems?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="object-cover w-16 h-16 "
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </td>
                      <td className="p-2">{item?.quantity}</td>
                      <td className="p-2">${item?.price?.toFixed(2)}</td>
                      <td className="p-2 ">
                        ${item?.quantity * item?.price?.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="mb-5 text-2xl font-semibold">Order Summary</h2>
          <div className="flex flex-wrap justify-between p-8 bg-white rounded-lg shadow-sm">
            <ul className="text-lg">
              <li>
                <span className="mb-4 font-semibold">
                  Items Price: <span>${cart?.itemsPrice} </span>
                </span>
              </li>
              <li>
                <span className="mb-4 font-semibold">
                  Shipping Price: <span>${cart?.shippingPrice} </span>
                </span>
              </li>
              <li>
                <span className="mb-4 font-semibold">
                  Tax Price: <span>${cart?.taxPrice} </span>
                </span>
              </li>
              <li>
                <span className="mb-4 font-semibold">
                  Total Price: <span>${cart?.totalPrice} </span>
                </span>
              </li>
            </ul>

            {error && <Message variant="error">{error?.data?.message}</Message>}

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart?.shippingAddress?.address}, {cart?.shippingAddress?.city},{" "}
                {cart?.shippingAddress?.postalCode},{" "}
                {cart?.shippingAddress?.country}
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart?.paymentMethod}
              </p>
            </div>
          </div>

          <div className={CustomCSS.buttonContainer}>
            <button
              className="w-full px-4 py-2 font-semibold text-center text-white uppercase bg-green-500 rounded-md text-md focus:ring-4 focus:outline-none focus:ring-green-300 hover:bg-green-600"
              disabled={cart?.cartItems === 0}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
