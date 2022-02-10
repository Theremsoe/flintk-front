import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  ButtonProps,
  Col,
  Divider,
  Form,
  FormProps,
  Input,
  List,
  Row,
} from "antd";
import { FormProviderProps } from "antd/lib/form/context";
import { FormattedMessage, FormattedNumber } from "react-intl";
import {
  CompanyMarketItem,
  CompanySchema,
} from "../../../../domain/models/company";
import { FormButtonsProps } from "../../../../domain/properties/components";
import { Time } from "../../../common/display/time";

export interface FormCompanyProps
  extends FormProps<CompanySchema>,
    Partial<FormButtonsProps> {
  marketButtonProps: ButtonProps;
  onEditMarket: (item: CompanyMarketItem, key: number) => void;
  onDeleteMarket: (item: CompanyMarketItem, key: number) => void;
  formProviderProps: FormProviderProps;
}

export default function FormUI({
  okButtonProps,
  cancelButtonProps,
  marketButtonProps,
  onEditMarket,
  onDeleteMarket,
  formProviderProps,
  children,
  ...formProps
}: Partial<FormCompanyProps>): JSX.Element {
  return (
    <Form.Provider {...formProviderProps}>
      <Form<CompanySchema>
        labelCol={{ sm: 6, lg: 7, xl: 8 }}
        wrapperCol={{ sm: 16, xl: 8 }}
        name="company-form"
        {...formProps}
      >
        <Divider orientation="left">
          <FormattedMessage
            id="company.form.sections.title"
            defaultMessage="Company info"
          />
        </Divider>
        <Form.Item name={["id"]} hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name={["type"]} hidden initialValue="company">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          name={["attributes", "name"]}
          label={
            <FormattedMessage
              id="company.form.fields.name.label"
              defaultMessage="Name"
            />
          }
          rules={[{ required: true }]}
        >
          <Input maxLength={50} size="large" />
        </Form.Item>
        <Form.Item
          name={["attributes", "description"]}
          label={
            <FormattedMessage
              id="company.form.fields.description.label"
              defaultMessage="Description"
            />
          }
          rules={[{ required: true }]}
        >
          <Input.TextArea maxLength={100} size="large" />
        </Form.Item>
        <Form.Item
          name={["attributes", "symbol"]}
          label={
            <FormattedMessage
              id="company.form.fields.symbol.label"
              defaultMessage="NASDAQ symbol"
            />
          }
          rules={[{ required: true }]}
        >
          <Input maxLength={10} size="large" />
        </Form.Item>
        <Form.Item name={["attributes", "market"]} hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage
              id="company.form.sections.market"
              defaultMessage="Market Values"
            />
          }
          shouldUpdate={(
            prevValues: Partial<CompanySchema>,
            curValues: Partial<CompanySchema>
          ): boolean =>
            prevValues?.attributes?.market !== curValues?.attributes?.market
          }
        >
          {({ getFieldValue }): JSX.Element => {
            const markets: CompanyMarketItem[] =
              getFieldValue(["attributes", "market"]) || [];
            return (
              <List<CompanyMarketItem>
                dataSource={markets}
                renderItem={(
                  market: CompanyMarketItem,
                  key: number
                ): JSX.Element => (
                  <List.Item
                    actions={[
                      <Button
                        key="add-market-value"
                        shape="circle"
                        type="text"
                        size="large"
                        icon={<EditOutlined />}
                        onClickCapture={(): void => onEditMarket?.(market, key)}
                      />,
                      <Button
                        key="delete-market-value"
                        shape="circle"
                        type="text"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClickCapture={(): void =>
                          onDeleteMarket?.(market, key)
                        }
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <>
                          <FormattedMessage
                            id="company.form.fields.market.value"
                            defaultMessage="Market value"
                          />
                          {": "}
                          <FormattedNumber value={market.value} />
                        </>
                      }
                      description={
                        <>
                          <FormattedMessage
                            id="company.form.fields.market.datetime"
                            defaultMessage="Date"
                          />
                          {": "}
                          <Time datetime={market.datetime} />
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            );
          }}
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Row justify="end">
            <Button
              shape="round"
              type="link"
              icon={<PlusOutlined />}
              {...marketButtonProps}
            >
              <span>
                <FormattedMessage
                  id="company.forms.actions.market.create"
                  defaultMessage="Add market value"
                />
              </span>
            </Button>
          </Row>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Row gutter={[20, 20]}>
            <Col span={24} sm={8} lg={6}>
              <Button
                size="large"
                block
                htmlType="reset"
                form="company-form"
                shape="round"
                icon={<LeftOutlined />}
                {...cancelButtonProps}
              >
                <span>
                  <FormattedMessage
                    id="forms.actions.cancel"
                    defaultMessage="Back"
                  />
                </span>
              </Button>
            </Col>
            <Col span={24} sm={8} lg={6}>
              <Button
                type="primary"
                size="large"
                block
                form="company-form"
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
      {children}
    </Form.Provider>
  );
}
