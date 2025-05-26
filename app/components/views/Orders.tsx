import { useCallback, useEffect, useState } from "react";
import { type Order } from "~/types/API";

function Orders() {
  const [
    orders,
    setOrders
  ] = useState<Order[]>([]);

  const fetchOrders = useCallback(
    async () => {
      try {
        const response = await fetch("./orders.json");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        alert("Error getting orders data!");
        console.error(
          "Error fetching orders data:",
          error
        );
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
    <div className="flex-1 max-w-[734px] max-h-[370px] grid gap-[12px]">
    </div>
  );
}

export default Orders;
