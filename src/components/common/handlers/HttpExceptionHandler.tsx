import { AxiosError } from "axios";
import ExceptionHandler from "./ExceptionHandler";
import {
  FeedbackException400,
  FeedbackException401,
  FeedbackException403,
  FeedbackException404,
  FeedbackException409,
  FeedbackException422,
  FeedbackException423,
} from "../feedback/feedbackExceptions";

export default class HttpExceptionHandler extends ExceptionHandler {
  public readonly feedbackBag: Record<number, JSX.Element> = {
    400: (
      <FeedbackException400
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    401: (
      <FeedbackException401
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    403: (
      <FeedbackException403
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    404: (
      <FeedbackException404
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    409: (
      <FeedbackException409
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    422: (
      <FeedbackException422
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
    423: (
      <FeedbackException423
        again={this.props.again}
        layout={this.props.layout}
      />
    ),
  };

  public render(): JSX.Element | JSX.Element[] | string | null {
    const exception: AxiosError | null = this.state
      .exception as AxiosError | null;

    if (
      exception &&
      exception.isAxiosError &&
      exception.response &&
      exception.response.status in this.feedbackBag
    ) {
      return this.feedbackBag[exception.response.status];
    }

    return super.render();
  }
}
