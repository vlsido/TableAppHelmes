import { render, screen } from "~/utils/test-utils";
import "@testing-library/jest-dom";
import Home from "~/routes/home";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
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
  "Home",
  () => {
    test(
      "Home route renders correctly",
      () => {
        render(<Home />);

        expect(screen.getByTestId("HOME.MAIN_CONTAINER:VIEW")).toBeVisible();
      }
    );
  }
);
