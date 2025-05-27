import { render, screen } from "~/utils/test-utils";
import TextButton from "~/components/buttons/TextButton";
import "@testing-library/jest-dom";

describe(
  "TextButton",
  () => {
    const mockFn = jest.fn();
    test(
      "Button renders correctly",
      () => {
        render(<TextButton
          text="Test"
          onPress={mockFn}
          ariaLabel="Test button"
          testId="TEXT_BUTTON.CONTAINER:BUTTON"
        />);

        expect(screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON")).not.toBeDisabled();
      }
    );
  }
);

