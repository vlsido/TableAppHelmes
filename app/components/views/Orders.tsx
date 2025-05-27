import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { type Order } from "~/types/API";
import TextButton from "../buttons/TextButton";
import { RefreshIcon } from "../icons/RefreshIcon";
import SearchQueryInput from "../inputs/SearchQueryInput";
import OrdersTable from "../tables/OrdersTable";
import { mockSearch } from "~/utils/app-utils";

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

        const response = await fetch("/orders.json");

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
        const response = await fetch(`/orders.json?search=${query}`);

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

        const response = await fetch(`/orders.json?search=${query}`);

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
    <div
      data-testid="ORDERS.CONTAINER:VIEW"
      className="flex w-[100%] max-w-[734px] place-self-center grid pt-[5%] px-[10px] gap-[12px]">
      <div
        data-testid="ORDERS.CONTAINER.HEADER:VIEW"
        className="flex flex-row justify-between">
        <h1 className="text-4xl font-semibold text-black">
          Orders
        </h1>
        <TextButton
          text="Refresh"
          testId="ORDERS.CONTAINER.HEADER.REFRESH:BUTTON"
          ariaLabel="Refresh orders data"
          onPress={fetchFresh}
          leftSideIcon={
            <RefreshIcon
              className={isFetching ? "animate-spin" : ""}
            />
          }
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
