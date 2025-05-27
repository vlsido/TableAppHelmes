import { render, screen } from "~/utils/test-utils";
import "@testing-library/jest-dom";
import OrdersTable from "~/components/tables/OrdersTable";
import { ordersMock } from "~/__mocks__/orders";

describe(
  "OrdersTable",
  () => {
    test(
      "Orders table does not render when orders.length === 0",
      () => {
        render(<OrdersTable
          orders={[]}
        />);

        expect(screen.getByTestId("ORDERS_TABLE.NO_ORDERS:TEXT")).toBeVisible();
      }
    );
    test(
      "Orders table renders when orders.length > 0",
      () => {
        render(<OrdersTable
          orders={ordersMock}
        />);

        expect(screen.queryByTestId("ORDERS_TABLE.NO_ORDERS:TEXT")).toBeNull();

        expect(screen.getByTestId("ORDERS_TABLE.CONTAINER:VIEW")).toBeVisible();
      }
    );
  }
);
