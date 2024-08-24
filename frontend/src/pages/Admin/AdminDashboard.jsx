import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalSalesQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "light",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trending",
        align: "left",
      },
      grid: {
        borderColor: "#999",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item?._id,
        y: item?.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item?.x),
          },
        },

        series: [
          {
            name: "Sales",
            data: formattedSalesDate.map((item) => item?.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="flex justify-around flex-wrap w-[80%]">
          <div className="rounded-lg bg-zinc-100 p-5 mt-5 w-[20rem]">
            <div className="font-bold rounded-full bg-neutral-200 w-[3rem] text-center p-3">
              $
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>

          <div className="rounded-lg bg-zinc-100 p-5 mt-5 w-[20rem]">
            <div className="font-bold rounded-full bg-neutral-200 w-[3rem] text-center p-3">
              $
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>

          <div className="rounded-lg bg-zinc-100 p-5 mt-5 w-[20rem]">
            <div className="font-bold rounded-full bg-neutral-200 w-[3rem] text-center p-3">
              $
            </div>

            <p className="mt-5">Orders</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state?.options}
            series={state?.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
