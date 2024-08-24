import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { CustomCSS } from "../../components/Custom/CustomCSS";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />

          <thead className="w-full border">
            <tr className="mb-[5rem]">
              <th className="pl-1 text-left">ITEMS</th>
              <th className="pl-1 text-left">ID</th>
              <th className="pl-1 text-left">USER</th>
              <th className="pl-1 text-left">DATA</th>
              <th className="pl-1 text-left">TOTAL</th>
              <th className="pl-1 text-left">PAID STATUS</th>
              <th className="pl-1 text-left">DELIVERED STATUS</th>
              <th className="pl-1 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order?._id}>
                  <td>
                    <img
                      src={order?.orderItems[0].image}
                      alt={order?._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  <td>{order?._id}</td>
                  <td>{order?.user ? order?.user?.username : "N/A"}</td>
                  <td>
                    {order?.createdAt
                      ? order?.createdAt.substring(0, 10)
                      : "N/A"}
                  </td>
                  <td>$ {order?.totalPrice}</td>
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
                  <td>
                    <Link
                      to={`/admin/order/${order?._id}`}
                      className={CustomCSS.buttonUpdate}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
