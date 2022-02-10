import { ButtonProps } from "antd";

export interface Children {
  children?: JSX.Element;
}

export interface AgainProp {
  again: JSX.Element;
}

export interface FormButtonsProps {
  okButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;
}

export interface InputEventHandler<T> {
  value?: T;
  onChange?: (value: T) => void;
}

export interface FeedbackLayout {
  layout: "inline" | "notification";
}
