import { Button, Col, Divider, Form, FormProps, InputNumber, Row } from "antd";
import { FormattedMessage } from "react-intl";
import { CompanyMarketItem } from "../../../../domain/models/company";
import { FormButtonsProps } from "../../../../domain/properties/components";
import { DatePicker } from "../../../common/entry/datepicker";

export default function FormMarketUI({
  okButtonProps,
  ...props
}: FormProps<CompanyMarketItem> & Partial<FormButtonsProps>): JSX.Element {
  return (
    <Form<CompanyMarketItem>
      name="market-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: "auto" }}
      {...props}
    >
      <Divider orientation="left">
        <FormattedMessage
          id="company.form.sections.market"
          defaultMessage="Market Values"
        />
      </Divider>
      <Form.Item name="id" hidden />
      <Form.Item
        name="value"
        label={
          <FormattedMessage
            id="company.form.fields.market.value.label"
            defaultMessage="Market Value"
          />
        }
        rules={[{ required: true }]}
      >
        <InputNumber className="w-full" size="large" />
      </Form.Item>
      <Form.Item
        name="datetime"
        label={
          <FormattedMessage
            id="company.form.fields.market.datetime.label"
            defaultMessage="Date"
          />
        }
        rules={[{ required: true }]}
      >
        <DatePicker size="large" className="w-full" />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Row gutter={[20, 20]} justify="end">
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              block
              form="market-form"
              htmlType="submit"
              shape="round"
              {...okButtonProps}
            >
              <span>
                <FormattedMessage
                  id="forms.actions.save"
                  defaultMessage="Save"
                />
              </span>
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
