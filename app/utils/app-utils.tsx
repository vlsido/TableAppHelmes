import type { Order } from "~/types/API";

/**
  *Search for orders 
*@param data - Orders array
*@param search - Search query
*@returns Found orders
*/
export function mockSearch(
  data: Order[], search: string
) {

  return data.filter((order: Order) => order.orderNumber.toUpperCase().includes(search.toUpperCase()));
}
