import type { Order } from "~/types/api";

interface OrdersTableProps {
  orders: Order[];
}

function OrdersTable(props: OrdersTableProps) {
  const mockDateClear = new Date(new Date().setFullYear(
    2024,
    11,
    16
  )).setHours(
    0,
    0,
    0,
    0
  );

  if (props.orders.length === 0) {
    return (
      <p
        data-testid="ORDERS_TABLE.NO_ORDERS:TEXT"
        className="text-black place-self-center">
        No orders!
      </p>
    );
  }

  return (
    <table
      data-testid="ORDERS_TABLE.CONTAINER:VIEW"
      className="border-[#EDEDED] rounded-sm">
      <thead>
        <tr className="text-black text-sm text-left">
          <th className="px-[24px]">Order #</th>
          <th>Created at</th>
          <th>Due date</th>
          <th className="px-[24px] text-right">Total</th>
          <th className="px-[24px] text-right">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.orders.map((
          order, index
        ) => {
          const rowClassName = index % 2 === 0
            ? "text-black bg-[#f5f5f5]"
            : "text-black";

          const createdAt = new Date(order.createdAt);

          const dueDate = new Date(order.dueDate);

          const formattedCreatedAt = createdAt.
            toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              }
            );

          const formattedDueDate = dueDate.
            toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );

          const formattedTotal = new Intl.NumberFormat(
            "en-US",
            {
              style: "currency",
              currency: "EUR"
            }
          ).format(order.total);

          let statusClassName = "";

          if (order.status === "PAID") {
            statusClassName = "text-[#2CD540]";
          } else if (order.status === "UNPAID" && dueDate.setHours(
            0,
            0,
            0,
            0
          ) >= mockDateClear) {
            statusClassName = "text-[#E4C93D]";
          } else {
            statusClassName = "text-[#F22424]";
          }

          return (
            <tr key={order.orderNumber} className={rowClassName + " text-left"}>
              <td className="px-[24px]" >{order.orderNumber}</td>
              <td>{formattedCreatedAt}</td>
              <td>{formattedDueDate}</td>
              <td className="text-right px-[24px]">{formattedTotal}</td>
              <td className={statusClassName + " text-right px-[24px] font-semibold"} >{order.status}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default OrdersTable;
