import { render, screen } from "~/utils/test-utils";
import "@testing-library/jest-dom";
import Orders from "~/components/views/Orders";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ordersMock } from "~/__mocks__/orders";

const server = setupServer(http.get(
  "/orders.json",
  () => {
    return HttpResponse.json(ordersMock)
  }
));

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(
  "Orders",
  () => {
    test(
      "Orders view renders correctly",
      async () => {
        render(<Orders />);

        await screen.findByTestId("ORDERS_TABLE.CONTAINER:VIEW");
      }
    );

    test(
      "Shows loading state initially",
      () => {
        render(<Orders />);
        expect(screen.getByTestId("ORDERS.CONTAINER.LOADING:TEXT")).toBeInTheDocument();
      }
    );

  }
);
