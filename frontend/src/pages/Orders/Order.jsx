import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrdersMutation,
} from "../../redux//api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrdersMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [paypalDispatch, { isPending }] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPaypal && !loadingPayPal && paypal.clientId) {
      const loadingPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaypalScript();
        }
      }
    }
  }, [errorPaypal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({
          orderId,
          details,
        });
        refetch();
        toast.success("Order is Paid!");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const handleDeliver = async () => {
    await deliverOrder(orderId);
    refetch();
    toast.success("Order Delivered Successfully!");
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.message}</Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="pr-4 md:w-2/3">
        <div className="pb-4 my-5 border-gray-300">
          {order?.orderItems?.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order?.orderItems?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-2">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="object-cover w-16 h-16"
                          />
                        </td>
                        <td className="p-2">
                          <Link to={`/product/${item?.product}`}>
                            {item?.name}
                          </Link>
                        </td>
                        <td className="p-2">{item?.quantity}</td>
                        <td className="p-2">${item?.price}</td>
                        <td className="p-2">${item?.price * item?.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="pb-4 mt-5 mb-4 border-gray-300">
          <h2 className="mb-2 text-xl font-bold">Shipping</h2>
          <p className="my-4">
            <strong>Order: </strong>
            {order?._id}
          </p>

          <p className="mb-4">
            <strong>Name: </strong>
            {order?.user?.username}
          </p>

          <p className="mb-4">
            <strong>Email: </strong>
            {order?.user?.email}
          </p>

          <p className="mb-4">
            <strong>Address: </strong>
            {order?.shippingAddress?.address}, {order?.shippingAddress?.city},{" "}
            {order?.shippingAddress?.postalCode},{" "}
            {order?.shippingAddress?.country}
          </p>

          <p className="mb-4">
            <strong>Payment Method: </strong>
            {order?.paymentMethod}
          </p>

          {order?.isPaid ? (
            <Message variant="success" className="text-green-600">
              Paid At: {order?.paidAt}
            </Message>
          ) : (
            <Message variant="error" className="text-red-600">
              Not Paid
            </Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items Price</span>
          <span>${order?.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Price</span>
          <span>${order?.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax Price</span>
          <span>${order?.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price</span>
          <span>${order?.totalPrice}</span>
        </div>

        {!order?.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo &&
          userInfo?.isAdmin &&
          order?.isPaid &&
          !order?.isDelivered && (
            <div>
              <button
                type="button"
                className="w-full px-4 py-2 font-semibold text-center text-white uppercase bg-green-500 rounded-md text-md focus:ring-4 focus:outline-none focus:ring-green-300 hover:bg-green-600"
                onClick={handleDeliver}
              >
                Mark As Delivered
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Order;
