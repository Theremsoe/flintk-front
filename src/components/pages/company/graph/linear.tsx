import { useContext } from "react";
import { CompanyContext } from "../../../../domain/contexts/company";
import { CompanyContextSchema } from "../../../../domain/contexts/schemas";
import { CompanySchema } from "../../../../domain/models/company";
import { Line } from "@ant-design/plots";
import { Button, Divider, Row } from "antd";
import { FormattedMessage } from "react-intl";
import { LeftOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function LinearGraph(): JSX.Element {
  const { companyContextValue }: CompanyContextSchema<CompanySchema | null> =
    useContext(CompanyContext);
  const history: NavigateFunction = useNavigate();

  const goBack = (): void => history("/company");

  return (
    <>
      <Divider orientation="left">
        <FormattedMessage
          id="company.chars.market.title"
          defaultMessage="Company market values"
        />
      </Divider>
      <Line
        data={companyContextValue?.attributes.market || []}
        xField="datetime"
        yField="value"
      />
      <Row justify="end" className="mt-6">
        <Button
          size="large"
          shape="round"
          icon={<LeftOutlined />}
          onClickCapture={goBack}
        >
          Back
        </Button>
      </Row>
    </>
  );
}
