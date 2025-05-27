import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ordersMock } from "~/__mocks__/orders";
import { callFetchOrders } from "~/utils/apis/serverApi";
import { OperationError } from "~/utils/errors/OperationError";
import { analyticsLogger } from "~/utils/loggers/analyticsLogger";

jest.mock(
  "~/utils/loggers/analyticsLogger",
  () => ({
    analyticsLogger: jest.fn()
  })
);

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
  "callFetchOrders",
  () => {

    test(
      "fetches all orders when no orderNumber is provided",
      async () => {
        const orders = await callFetchOrders();

        expect(orders).toEqual(ordersMock);
      }
    );

    test(
      "fetches filtered orders when orderNumber is provided",
      async () => {

        const orders = await callFetchOrders("o8");

        expect(orders).toEqual([
          {
            orderNumber: "O8392489",
            dueDate: "2024-12-05",
            createdAt: "2024-11-30T14:56:43Z",
            total: 7392.43,
            status: "PAID"
          },
        ]);
      }
    );

    test(
      "fetches filtered orders when a substring of orderNumber is provided",
      async () => {

        const orders = await callFetchOrders("39248");

        expect(orders).toEqual([
          {
            orderNumber: "O8392489",
            dueDate: "2024-12-05",
            createdAt: "2024-11-30T14:56:43Z",
            total: 7392.43,
            status: "PAID"
          },
        ]);
      }
    );

    test(
      "throws OperationError and logs on fetch failure",
      async () => {
        const consoleErrorSpy = jest.spyOn(
          console,
          "error"
        ).mockImplementation(() => { });


        server.use(http.get(
          "/orders.json",
          () => {
            return new HttpResponse(
              null,
              { status: 401 }
            )
          }
        ));

        await expect(callFetchOrders()).rejects.toThrow(OperationError);

        expect(analyticsLogger).toHaveBeenCalledWith(
          "Couldn't fetch orders",
          expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
      }
    );
  }
);
