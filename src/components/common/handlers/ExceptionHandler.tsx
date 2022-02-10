import { Component, useCallback, useState } from "react";
import { FeedbackLayout } from "../../../domain/properties/components";
import { FeedbackGenericException } from "../feedback/feedbackExceptions";

export interface ExceptionHandlerProps extends FeedbackLayout {
  children: JSX.Element | JSX.Element[] | string | null;
  again: JSX.Element;
}

export interface ExceptionHandlerState {
  exception: Error | null;
}

export default class ExceptionHandler extends Component<
  Partial<ExceptionHandlerProps>,
  ExceptionHandlerState
> {
  public readonly state: ExceptionHandlerState = {
    exception: null,
  };

  public static getDerivedStateFromError(
    exception: Error
  ): ExceptionHandlerState {
    console.error(exception);
    return { exception };
  }

  public render(): JSX.Element | JSX.Element[] | string | null {
    if (this.state.exception) {
      return (
        <FeedbackGenericException
          again={this.props.again}
          layout={this.props.layout}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useAsyncError() {
  const [, setError] = useState<Error | null>(null);

  return useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
}
