import { InputEventHandler } from "../../../domain/properties/components";
import { DatePicker as AntDatePicker, DatePickerProps } from "antd";
import moment from "moment";
import { DateTime } from "luxon";

export function DatePicker({
  value,
  onChange,
  ...props
}: InputEventHandler<string | undefined> & DatePickerProps): JSX.Element {
  const triggerChange = (changedValue: string | undefined): void =>
    onChange?.(changedValue);

  const defaultValue = value ? moment(value) : undefined;

  return (
    <AntDatePicker
      value={defaultValue}
      onChange={(value): void => {
        const date: Date | undefined = value?.toDate();

        // eslint-disable-next-line no-console
        console.log(value?.toISOString());

        if (date) {
          return triggerChange(DateTime.fromJSDate(date).toISO());
        }

        triggerChange(date);
      }}
      {...props}
    />
  );
}
