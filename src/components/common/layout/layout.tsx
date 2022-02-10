import { Breadcrumb, Button, Layout as AntdLayout } from "antd";
import { BrowserRouter } from "react-router-dom";
import LayoutUI from "../../pages/company/layout.ui";
import { HomeFilled } from "@ant-design/icons";

export interface LayoutProps {
  breadcrumbs: [];
}

export default function Layout({
  breadcrumbs,
}: Partial<LayoutProps>): JSX.Element {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <AntdLayout.Header>
        <Button
          shape="circle"
          type="text"
          icon={<HomeFilled className="text-white" />}
          href="/"
        />
      </AntdLayout.Header>
      <AntdLayout.Content className="p-5">
        <Breadcrumb>{breadcrumbs}</Breadcrumb>
        <AntdLayout className="p-5 bg-white">
          <BrowserRouter>
            <LayoutUI />
          </BrowserRouter>
        </AntdLayout>
      </AntdLayout.Content>
      <AntdLayout.Footer>Flink App Demo by Julio Jaramillo</AntdLayout.Footer>
    </AntdLayout>
  );
}
