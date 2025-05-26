import {
  useCallback,
  useEffect,
  useState
} from "react";
import { type Order } from "~/types/API";
import TextButton from "../buttons/TextButton";
import { RefreshIcon } from "../icons/RefreshIcon";
import SearchQueryInput from "../inputs/SearchQueryInput";
import OrdersTable from "../tables/OrdersTable";

// Global scope, because it's a backend function
/**
  *Search for orders 
  *@param data - Orders array
  *@param search - Search query
  *@returns Found orders
  */

function mockSearch(
  data: Order[], search: string
) {

  return data.filter((order: Order) => order.orderNumber.toUpperCase().includes(search.toUpperCase()));
}

function Orders() {
  const [
    orders,
    setOrders
  ] = useState<Order[]>([]);

  const [
    isFetching,
    setIsFetching
  ] = useState<boolean>(true);

  const [
    query,
    setQuery
  ] = useState<string>("");

  const fetchOrders = useCallback(
    async () => {
      try {
        setIsFetching(true);

        const response = await fetch("./orders.json");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        alert("Error getting orders data!");
        console.error(
          "Error fetching orders data:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const fetchQueryData = useCallback(
    async (query: string) => {
      try {
        const response = await fetch(`./orders.json?search=${query}`);

        const data = await response.json();

        // Mock search function on the backend 
        const foundOrders = mockSearch(
          data,
          query
        );

        setOrders(foundOrders);
      } catch (error) {
        alert("Error while searching orders data!");
        console.error(
          "Error while searching orders data:",
          error
        );
      }
    },
    []
  );

  const fetchFresh = useCallback(
    async () => {
      try {
        setIsFetching(true);

        const response = await fetch(`./orders.json?search=${query}`);

        const data = await response.json();

        const foundOrders = mockSearch(
          data,
          query
        );

        setOrders(foundOrders);
      } catch (error) {
        alert("Error refreshing orders data!");
        console.error(
          "Error fetching orders data:",
          error
        );
      } finally {
        setIsFetching(false);
      }
    },
    [
      query
    ]
  );

  useEffect(
    () => {
      fetchOrders();
    },
    []
  );

  useEffect(
    () => {
      if (query.length >= 2) {
        fetchQueryData(query);
      }
    },
    [
      query
    ]
  );

  const onChangeQuery = useCallback(
    (text: string) => {
      setQuery(text);
    },
    []
  );

  return (
    <div className="flex-1 grid pt-[5%] px-[10px] gap-[12px]">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-semibold text-black">
          Orders
        </h1>
        <TextButton
          text="Refresh"
          onPress={fetchFresh}
          leftSideIcon={<RefreshIcon />}
        />
      </div>
      <SearchQueryInput
        value={query}
        onChange={onChangeQuery}
      />
      {isFetching ? (
        <p className="text-black place-self-center">
          Loading...
        </p>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}

export default Orders;
