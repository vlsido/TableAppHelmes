import type { ReactElement } from "react";

interface TextButtonProps {
  testId: string;
  text: string;
  onPress: () => void;
  ariaLabel: string;
  leftSideIcon?: ReactElement;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
}

function TextButton(props: TextButtonProps) {

  return (
    <button
      className="flex flex-row items-center px-[16px] py-[10px] gap-[8px] text-black bg-red rounded-sm"
      data-testid={props.testId}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      style={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#005EFF",
        color: props.color ? props.color : "#fff"
      }}
      onPointerDown={props.onPress}
    >
      {props.leftSideIcon}
      <p className="text-[14px]">
        {props.text}
      </p>
    </button>
  );
}

export default TextButton;
