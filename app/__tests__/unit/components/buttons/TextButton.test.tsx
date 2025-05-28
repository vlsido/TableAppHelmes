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
          testId="TEXT_BUTTON.CONTAINER:BUTTON"
          text="Test"
          onPress={mockFn}
          ariaLabel="Test button"
        />);

        expect(screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON")).toBeVisible();
        expect(screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON")).not.toBeDisabled();
      }
    );

    test(
      "Button is disabled if 'disabled' prop is set to 'true'",
      () => {
        render(<TextButton
          testId="TEXT_BUTTON.CONTAINER:BUTTON"
          text="Test"
          onPress={mockFn}
          disabled={true}
          ariaLabel="Test button"
        />);

        expect(screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON")).toBeVisible();
        expect(screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON")).toBeDisabled();
      }
    );

    test(
      "Button renders with custom background color and text",
      () => {
        const text = "Colored Button";

        render(<TextButton
          testId="TEXT_BUTTON.CONTAINER:BUTTON"
          text={text}
          onPress={mockFn}
          ariaLabel="Colored button"
          containerClassName="bg-[red]"
        />);

        const button = screen.getByTestId("TEXT_BUTTON.CONTAINER:BUTTON");

        expect(button).toHaveClass("bg-[red]");

        expect(button).toHaveTextContent(text);
      }
    );
  }
);

