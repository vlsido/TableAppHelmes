import { render, screen } from "~/utils/test-utils";
import "@testing-library/jest-dom";
import SearchQueryInput from "~/components/inputs/SearchQueryInput";

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
  }
);
