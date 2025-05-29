import type { Order } from "~/types/api";

interface ResponsiveRowProps {
  order: Order;
  index: number;
}

function ResponsiveRow(props: ResponsiveRowProps) {
  const rowClassName = props.index % 2 === 0
    ? "bg-[#f5f5f5]"
    : "";

  const createdAt = new Date(props.order.createdAt);

  const dueDate = new Date(props.order.dueDate);

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
  ).format(props.order.total);

  let statusClassName = "";

  if (props.order.status === "PAID") {
    statusClassName = "text-[#2CD540]";
  } else if (props.order.status === "UNPAID" && dueDate.setHours(
    0,
    0,
    0,
    0
  ) >= Date.now()) {
    statusClassName = "text-[#E4C93D]";
  } else {
    statusClassName = "text-[#F22424]";
  }

  return (
    <div
      className={`${rowClassName} text-black text-left text-[14px] px-[24px] gap-[24px] md:py-[12px]
      grid grid-cols-[auto_1fr] md:grid-cols-5 md:grid-flow-row`}
      role="row"
    >
      <div
        role="gridcell"
        aria-colindex={1}
        className="whitespace-nowrap border-r-[1px] md:border-none pr-[24px] md:pr-[0px] place-content-center "
      >
        {props.order.orderNumber}
      </div>
      <div className="flex gap-[24px] overflow-x-auto py-[12px] md:py-[0px] md:contents">
        <div
          role="gridcell"
          aria-colindex={2}
          className="flex-1 whitespace-nowrap md:whitespace-normal place-content-center"
        >
          {formattedCreatedAt}
        </div>
        <div
          role="gridcell"
          aria-colindex={3}
          className="flex-1 whitespace-nowrap md:whitespace-normal place-content-center"
        >
          {formattedDueDate}
        </div>
        <div
          role="gridcell"
          aria-colindex={4}
          className="flex-1 text-right whitespace-nowrap md:whitespace-normal place-content-center"
        >
          {formattedTotal}
        </div>
        <div
          role="gridcell"
          aria-colindex={5}
          className={`${statusClassName} flex-1 text-right font-bold whitespace-nowrap md:whitespace-normal place-content-center`}
        >
          {props.order.status}
        </div>
      </div>
    </div>
  );
}

export default ResponsiveRow;
