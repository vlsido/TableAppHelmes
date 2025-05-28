import {
  useCallback,
  useEffect,
  useState
} from "react";
import TextButton from "../buttons/TextButton";
import { RefreshIcon } from "../icons/RefreshIcon";
import SearchQueryInput from "../inputs/SearchQueryInput";
import OrdersTable from "../tables/OrdersTable";
import { OperationError } from "~/utils/errors/OperationError";
import type { Order } from "~/types/api";
import { callFetchOrders } from "~/utils/apis/serverApi";

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
    async (query?: string) => {
      try {
        if (!query) {
          setIsFetching(true);
        }

        const orders = await callFetchOrders(query);

        setOrders(orders);
      } catch (error) {
        if (error instanceof OperationError) {
          switch (error.code) {
            case "api/error":
              alert("Server error! Try again later.");
              break;
            default:
              alert("Error getting orders data");
          }

        } else {
          alert("Unexpected error!");
        }
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const handleRefresh = useCallback(
    () => {
      setIsFetching(true);
      fetchOrders(query);
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
        fetchOrders(query);
      }
    },
    [
      query
    ]
  );

  return (
    <div
      data-testid="ORDERS.CONTAINER:VIEW"
      className="flex w-[100%] max-w-[754px] place-self-center grid mx-auto py-[5%] px-[10px] gap-[12px]">
      <div
        data-testid="ORDERS.CONTAINER.HEADER:VIEW"
        className="flex flex-row justify-between">
        <h1 className="text-[36px] font-semibold text-black">
          Orders
        </h1>
        <TextButton
          text="Refresh"
          testId="ORDERS.CONTAINER.HEADER.REFRESH:BUTTON"
          ariaLabel="Refresh orders data"
          containerClassName="flex flex-row items-center self-center px-[16px] py-[10px] gap-[8px] bg-[#005EFF] rounded-[4px] cursor-pointer"
          textClassName="text-[14px] text-white font-semibold"
          onPress={handleRefresh}
          leftSideIcon={
            <RefreshIcon
              className={isFetching ? "animate-spin" : ""}
            />
          }
        />
      </div>
      <SearchQueryInput
        value={query}
        onChange={setQuery}
      />
      {isFetching ? (
        <p
          data-testid="ORDERS.CONTAINER.LOADING:TEXT"
          className="text-black place-self-center">
          Loading...
        </p>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}

export default Orders;
