import {
  Button,
  Divider,
  Grid,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from "antd";
import { CompanySchema } from "../../../../domain/models/company";
import { Time } from "../../../common/display/time";
import {
  EditOutlined,
  DeleteOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import { Link } from "react-router-dom";

export default function GridUI<T extends CompanySchema>(
  props: TableProps<T>
): JSX.Element {
  const screens: Partial<Record<Breakpoint, boolean>> = Grid.useBreakpoint();

  return (
    <Table<T> {...props}>
      <Table.Column
        title="Name"
        dataIndex={["attributes", "name"]}
        render={(name: string, company: CompanySchema): JSX.Element => {
          return (
            <>
              <Space align="center" className="mb-3">
                <Typography.Title level={5} className="!mb-0">
                  {name}
                </Typography.Title>
                {!screens.lg && (
                  <Tag color="blue">{company.attributes.symbol}</Tag>
                )}
              </Space>
              <Typography.Paragraph type="secondary">
                {company.attributes.description}
              </Typography.Paragraph>
              {!screens.lg && <Controls company={company} />}
            </>
          );
        }}
      />
      <Table.Column
        title="NASDAQ"
        dataIndex={["attributes", "symbol"]}
        responsive={["lg"]}
        render={(symbol: string): JSX.Element => (
          <Tag color="blue">{symbol}</Tag>
        )}
      />
      <Table.Column
        sorter
        title="Created"
        dataIndex={["attributes", "createdAt"]}
        responsive={["lg"]}
        render={(date: string): JSX.Element => <Time datetime={date} />}
      />
      <Table.Column
        sorter
        title="Updated"
        dataIndex={["attributes", "updatedAt"]}
        responsive={["lg"]}
        render={(date: string): JSX.Element => <Time datetime={date} />}
      />
      <Table.Column
        dataIndex="id"
        responsive={["lg"]}
        render={(id: string, company: CompanySchema): JSX.Element => (
          <Controls company={company} />
        )}
      />
    </Table>
  );
}

export interface ControlsProps {
  company: CompanySchema;
}
export function Controls({ company }: ControlsProps): JSX.Element {
  return (
    <Space
      split={<Divider type="vertical" />}
      className="w-full justify-center"
    >
      <Link to={`/company/graph/${company.id}`}>
        <Button
          size="large"
          shape="circle"
          type="text"
          icon={<LineChartOutlined key="chart" />}
        />
      </Link>
      <Link to={`/company/form/${company.id}`} state={{ from: { location } }}>
        <Button
          size="large"
          shape="circle"
          type="text"
          icon={<EditOutlined key="edit" />}
        />
      </Link>
      <Button
        size="large"
        shape="circle"
        type="text"
        icon={<DeleteOutlined key="delete" />}
      />
    </Space>
  );
}
