import type { Order } from "~/types/api";
import ResponsiveRow from "./rows/ResponsiveRow";

interface OrdersTableProps {
  orders: Order[];
}

function OrdersTable(props: OrdersTableProps) {
  if (props.orders.length === 0) {
    return (
      <p
        data-testid="ORDERS_TABLE.NO_ORDERS:TEXT"
        className="text-black place-self-center">
        No orders!
      </p>
    );
  }

  const currentDateAtMidnightInMs: number = new Date().setHours(
    0,
    0,
    0,
    0
  );

  return (
    <div
      data-testid="ORDERS_TABLE.CONTAINER:VIEW"
      className="border border-[#EDEDED] rounded-[4px]"
      role="grid"
      aria-colcount={5}
    >
      <div
        role="rowgroup"
      >
        <div
          role="row"
          className="grid grid-flow-row grid-cols-5 py-[12px] px-[24px] gap-[24px] text-black text-[14px] text-left font-semibold wrap-anywhere"
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
        ) =>
          <ResponsiveRow
            key={order.orderNumber}
            order={order}
            index={index}
            currentDateAtMidnightInMs={currentDateAtMidnightInMs}
          />)}
      </div>
    </div>
  );

}

export default OrdersTable;
