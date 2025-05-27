import type { Order } from "~/types/api";
import { OperationError } from "../errors/OperationError";
import { analyticsLogger } from "../loggers/analyticsLogger";

/**
  * Fetch orders 
  * @param {string} [orderNumber] - Order number to search for
  * @returns Found orders
  */
export async function callFetchOrders(orderNumber?: string): Promise<Order[]> {
  try {
    let response;

    if (orderNumber) {
      response = await fetch(`/orders.json?search=${orderNumber}`);
    } else {
      response = await fetch("/orders.json");
    }

    const data = await response.json();

    let foundOrders = data;

    if (orderNumber) {
      foundOrders = mockSearch(
        data,
        orderNumber
      );
    }

    return foundOrders;
  } catch (e) {
    console.error(
      "Error fetching orders",
      e
    );

    analyticsLogger(
      "Couldn't fetch orders",
      new Error("Error fetching orders: " + JSON.stringify(e))
    );

    throw new OperationError(
      "api/error",
      "Error fetching orders"
    );
  }
}

function mockSearch(
  orders: Order[], orderNumber: string
) {

  return orders.filter((order: Order) => order.orderNumber.toUpperCase().includes(orderNumber.toUpperCase()));
}
