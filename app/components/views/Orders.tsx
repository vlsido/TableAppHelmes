import { useState } from "react";
import { type Order } from "~/types/API";

function Orders() {
  const [
    orders,
    setOrders
  ] = useState<Order[]>([]);

  return (
    <div className="flex-1 max-w-[734px] max-h-[370px] grid gap-[12px]">
    </div>
  );
}

export default Orders;
