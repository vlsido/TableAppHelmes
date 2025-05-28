import type { ReactElement } from "react";

interface TextButtonProps {
  testId: string;
  text: string;
  onPress: () => void;
  ariaLabel: string;
  containerClassName?: string;
  textClassName?: string;
  leftSideIcon?: ReactElement;
  disabled?: boolean;
}

function TextButton(props: TextButtonProps) {

  return (
    <button
      data-testid={props.testId}
      className={props.containerClassName
        ? props.containerClassName
        : "flex flex-row items-center px-[16px] py-[10px] gap-[8px] bg-black rounded-sm cursor-pointer"
      }
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onPointerDown={props.onPress}
    >
      {props.leftSideIcon}
      <p
        className={props.textClassName
          ? props.textClassName
          : "text-[14px]"
        }>
        {props.text}
      </p>
    </button>
  );
}

export default TextButton;
