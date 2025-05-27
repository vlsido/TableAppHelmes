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
    <div
      data-testid="ORDERS_TABLE.CONTAINER:VIEW"
      className="border border-[#EDEDED] rounded-sm">
      <div className="flex flex-row py-[12px] px-[24px] gap-[24px] text-black text-sm text-left font-semibold wrap-anywhere">
        <p className="flex-1">Order #</p>
        <p className="flex-1">Created at</p>
        <p className="flex-1">Due date</p>
        <p className="flex-1 text-right">Total</p>
        <p className="flex-1 text-right">Status</p>
      </div>
      <div>
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
            <div key={order.orderNumber} className={rowClassName + " flex flex-row py-[12px] px-[24px] gap-[24px] text-left wrap-anywhere"}>
              <p className="flex-1" >{order.orderNumber}</p>
              <p className="flex-1">{formattedCreatedAt}</p>
              <p className="flex-1">{formattedDueDate}</p>
              <p className="flex-1 text-right ">{formattedTotal}</p>
              <p className={statusClassName + " flex-1 text-right font-bold"} >{order.status}</p>
            </div>
          )
        })}
      </div>
    </div>
  );

}

export default OrdersTable;
