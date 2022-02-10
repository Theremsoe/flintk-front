import { Row, Col, notification } from "antd";
import { useIntl } from "react-intl";
import {
  AgainProp,
  FeedbackLayout,
} from "../../../domain/properties/components";

export interface NotificationExceptionProps extends AgainProp, FeedbackLayout {
  title: string | JSX.Element;
  description: string | JSX.Element;
}

export function FeedbackException({
  title,
  description,
  again,
  layout,
}: Partial<NotificationExceptionProps>): JSX.Element {
  if (layout === "notification") {
    notification.error({ message: title, description });
    return <></>;
  }

  return (
    <Row gutter={[32, 32]} justify="center" align="middle" className="h-96">
      <Col>
        <div className="p-12 bg-white border-gray-100 border rounded text-center shadow-md">
          <p className="text-gray-600 mb-2">{title}</p>
          <p className="text-gray-500 text-xs">{description}</p>
          {again && <p className="py-2">{again}</p>}
        </div>
      </Col>
    </Row>
  );
}

export function FeedbackGenericException({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.message",
        defaultMessage: "Something happend",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.message.details",
        defaultMessage: "We will try fix this as soon as possible",
      })}
      again={again}
    />
  );
}

export function FeedbackException400({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.400.title",
        defaultMessage: "We have a problem when we try process you information",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.400.description",
        defaultMessage: "Please, check that you data is correct and try again",
      })}
      again={again}
    />
  );
}

export function FeedbackException401({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.401.title",
        defaultMessage: "You are unauthorized",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.401.description",
        defaultMessage:
          "Your request can not be resolved because you session is expired",
      })}
      again={again}
    />
  );
}

export function FeedbackException403({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.403.title",
        defaultMessage: "Wait a moment!",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.403.description",
        defaultMessage: "You can not see this content because is restricted",
      })}
      again={again}
    />
  );
}

export function FeedbackException404({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.404.title",
        defaultMessage: "Not found!",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.404.description",
        defaultMessage: "Sorry, but the content is not more available",
      })}
      again={again}
    />
  );
}

export function FeedbackException409({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.409.title",
        defaultMessage: "Conflict!",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.409.description",
        defaultMessage:
          "Sorry, but we have a conflict with the resource that you wants consume",
      })}
      again={again}
    />
  );
}

export function FeedbackException422({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.422.title",
        defaultMessage: "Unprocessable Entity!",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.422.description",
        defaultMessage: "The data that you wants save is invalid!",
      })}
      again={again}
    />
  );
}

export function FeedbackException423({
  again,
}: Partial<AgainProp> & Partial<FeedbackLayout>): JSX.Element {
  const intl = useIntl();
  return (
    <FeedbackException
      title={intl.formatMessage({
        id: "common.exceptions.http.423.title",
        defaultMessage: "Locked!",
      })}
      description={intl.formatMessage({
        id: "common.exceptions.http.423.description",
        defaultMessage: "The resource that is being accessed is locked.",
      })}
      again={again}
    />
  );
}
