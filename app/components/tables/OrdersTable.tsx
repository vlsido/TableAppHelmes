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
      className="border border-[#EDEDED] rounded-sm"
      role="grid"
      aria-colcount={5}
    >
      <div
        role="rowgroup"
      >
        <div
          role="row"
          className="grid grid-flow-row grid-cols-5 py-[12px] px-[24px] gap-[24px] text-black text-sm text-left font-semibold wrap-anywhere"
        >
          <div
            role="columnheader"
            aria-colindex={1}
          >
            Order #
          </div>
          <div
            role="columnheader"
            aria-colindex={2}
          >
            Created at
          </div>
          <div
            role="columnheader"
            aria-colindex={3}>
            Due date
          </div>
          <div
            role="columnheader"
            aria-colindex={4}
            className="text-right"
          >
            Total
          </div>
          <div
            role="columnheader"
            aria-colindex={5}
            className="text-right"
          >
            Status
          </div>
        </div>
      </div>
      <div
        role="rowgroup"
      >
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
            <div
              key={order.orderNumber}
              className={rowClassName + " grid grid-flow-row grid-cols-5 py-[12px] px-[24px] gap-[24px] text-left wrap-anywhere"}
              role="row"
            >
              <div
                role="gridcell"
                aria-colindex={1}
              >
                {order.orderNumber}
              </div>
              <div
                role="gridcell"
                aria-colindex={2}
              >
                {formattedCreatedAt}
              </div>
              <div
                role="gridcell"
                aria-colindex={3}
              >
                {formattedDueDate}
              </div>
              <div
                role="gridcell"
                aria-colindex={4}
                className="text-right"
              >
                {formattedTotal}
              </div>
              <div
                role="gridcell"
                aria-colindex={5}
                className={statusClassName + " text-right font-semibold"}
              >
                {order.status}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

}

export default OrdersTable;
