import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { CustomCSS } from "../../components/Custom/CustomCSS";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.error || error?.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2">ACTION </td>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order?._id}>
                  <td className="py-2">
                    <img
                      src={order?.orderItems[0].image}
                      alt={order?.user}
                      className="w-[6rem] mb-5"
                    />
                  </td>
                  <td className="py-2">{order?._id}</td>
                  <td className="py-2">{order?.createdAt.substring(0, 10)}</td>
                  <td className="py-2">${order?.totalPrice}</td>
                  <td className="py-2">
                    {order?.isPaid ? (
                      <p className="p-1 text-center bg-green-100 text-green-600 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-yellow-100 text-yellow-600 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    {order?.isDelivered ? (
                      <p className="p-1 text-center bg-green-100 text-green-600 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-yellow-100 text-yellow-600 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <Link to={`/order/${order?._id}`}>
                      <button className={CustomCSS.buttonUpdate}>
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
