import { fireEvent, render, screen } from "~/utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SearchQueryInput from "~/components/inputs/SearchQueryInput";
import { useState } from "react";

describe(
  "SearchQueryInput",
  () => {
    const mockFn = jest.fn();
    test(
      "Input renders correctly",
      () => {
        const inputValue = "Test Input";
        render(<SearchQueryInput
          value={inputValue}
          onChange={mockFn}
        />);

        expect(screen.getByTestId("SEARCH_QUERY_INPUT.CONTAINER:INPUT")).toHaveValue(inputValue);
      }
    );

    test(
      "Input field calls onChange and updates value when user types",
      async () => {
        const Wrapper = () => {
          const [
            query,
            setQuery
          ] = useState("");

          return (
            <SearchQueryInput
              value={query}
              onChange={setQuery}
            />
          );
        };

        render(<Wrapper />);
        const input = screen.getByTestId("SEARCH_QUERY_INPUT.CONTAINER:INPUT");

        const userInput = "user input test";

        await userEvent.type(
          input,
          userInput
        );

        expect(input).toHaveValue(userInput);
      }
    );
  }
);
