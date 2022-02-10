import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Spin } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CompanySchema } from "../../../../domain/models/company";
import { Children } from "../../../../domain/properties/components";
import { ParamIdentifier } from "../../../../domain/router/params";
import { CompanyContext } from "../../../../domain/contexts/company";
import { useAsyncError } from "../../../common/handlers/ExceptionHandler";
import http from "../../../../domain/http/flink";
import HttpExceptionHandler from "../../../common/handlers/HttpExceptionHandler";

export interface ContextResolverProps<T> extends Children {
  handlerResolver: () => Promise<T>;
}

export function CompanyResolver({
  handlerResolver,
  children,
}: ContextResolverProps<CompanySchema | null>): JSX.Element {
  const [companyContextValue, setCompanyContextValue] =
    useState<CompanySchema | null>(null);
  const [promise, setPromise] = useState<Promise<CompanySchema | null> | null>(
    null
  );
  const throwError = useAsyncError();

  useEffect((): void => {
    setPromise(handlerResolver());
  }, []);

  if (promise) {
    promise
      .then((item: CompanySchema | null): void => setCompanyContextValue(item))
      .catch((exception: Error): void => throwError(exception))
      .finally(() => setPromise(null));

    return (
      <Row gutter={[32, 32]} justify="center" align="middle" className="h-36">
        <Col>
          <Spin indicator={<LoadingOutlined className="text-2xl" />} />
        </Col>
      </Row>
    );
  }

  return (
    <CompanyContext.Provider
      value={{ companyContextValue, setCompanyContextValue }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function CompanyResolverByParams({ children }: Children): JSX.Element {
  const { id }: Readonly<Partial<ParamIdentifier>> =
    useParams<ParamIdentifier>();

  const handler = (): Promise<CompanySchema | null> =>
    id
      ? http.get(`/company/${id}`).then((res): CompanySchema => res.data.data)
      : Promise.resolve(null);

  return (
    <HttpExceptionHandler>
      <CompanyResolver handlerResolver={handler}>{children}</CompanyResolver>
    </HttpExceptionHandler>
  );
}
