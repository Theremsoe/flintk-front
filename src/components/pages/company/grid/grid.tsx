import { AxiosPromise, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  CompanyCollection,
  CompanySchema,
} from "../../../../domain/models/company";
import GridUI from "./grid.ui";
import http, { toJsonApiParams } from "../../../../domain/http/flink";
import { Paginated } from "../../../../domain/models/jsonapi";
import {
  FilterValue,
  TablePaginationConfig,
  SorterResult,
} from "antd/lib/table/interface";
import { FormattedMessage } from "react-intl";
import { Button, Divider, Space } from "antd";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Grid(): JSX.Element {
  const [data, setData] = useState<CompanySchema[]>([]);
  const [pagination, setPagination] = useState<Paginated>();
  const history: NavigateFunction = useNavigate();
  const [fetch, setFetch] = useState<AxiosPromise<CompanyCollection> | null>(
    null
  );

  const fetchCollection = (
    pagination?: TablePaginationConfig,
    filters?: Record<string, FilterValue | null>,
    sorter?: SorterResult<CompanySchema> | SorterResult<CompanySchema>[]
  ): void => {
    const fetch = http.get("/company", {
      params: toJsonApiParams(pagination, filters, sorter),
    });

    fetch.then((res: AxiosResponse<CompanyCollection>): void => {
      setData(res.data.data);
      setPagination(res.data.meta);
    });
    fetch.finally((): void => setFetch(null));

    setFetch(fetch);
  };

  const createCompany = (): void => history("/company/form");
  const goToHome = (): void => history("/");

  useEffect(fetchCollection, []);

  return (
    <>
      <Space
        split={<Divider type="vertical" />}
        className="mb-3 w-full justify-end"
      >
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<HomeOutlined />}
          onClickCapture={goToHome}
        />
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<EditOutlined />}
          onClickCapture={createCompany}
        />
      </Space>
      <GridUI
        rowKey="id"
        loading={!!fetch}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          pageSize: pagination?.page.perPage,
          total: pagination?.page.total,
          current: pagination?.page.currentPage,
          showTotal: () => (
            <FormattedMessage
              id="common.grids.total.title"
              defaultMessage="Total {total} item(s)"
              values={{ total: pagination?.page.total }}
            />
          ),
        }}
        onChange={fetchCollection}
      />
    </>
  );
}
