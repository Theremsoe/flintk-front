import { Tooltip } from "antd";
import { FormattedDate } from "react-intl";

export interface TimeProps {
  datetime: string | number | Date;
}

export function Time({ datetime }: TimeProps): JSX.Element {
  const datejs: Date = !(datetime instanceof Date)
    ? new Date(datetime)
    : datetime;
  return (
    <Tooltip title={datejs.toLocaleString()}>
      <time dateTime={datejs.toString()}>
        <FormattedDate value={datejs} dateStyle="short" timeStyle="medium" />
      </time>
    </Tooltip>
  );
}
