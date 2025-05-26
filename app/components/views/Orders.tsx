import { useCallback, useEffect, useState } from "react";
import { type Order } from "~/types/API";
import TextButton from "../buttons/TextButton";
import { RefreshIcon } from "../icons/RefreshIcon";
import SearchOrderInput from "../inputs/SearchOrderInput";
import OrdersTable from "../tables/OrdersTable";

function Orders() {
  const [
    orders,
    setOrders
  ] = useState<Order[]>([]);

  const [
    isFetching,
    setIsFetching
  ] = useState<boolean>(true);

  const fetchOrders = useCallback(
    async () => {
      try {
        setIsFetching(true);

        const response = await fetch("./orders.json");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        alert("Error getting orders data!");
        console.error(
          "Error fetching orders data:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  useEffect(
    () => {
      fetchOrders();
    },
    []
  );

  return (
    <div className="grid gap-[24px]">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold text-black">
          Orders
        </h1>
        <TextButton
          text="Refresh"
          onPress={fetchOrders}
          leftSideIcon={<RefreshIcon />}
        />
      </div>
      <SearchOrderInput />
      {isFetching ? (
        <p className="text-black place-self-center">
          Loading...
        </p>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}

export default Orders;
