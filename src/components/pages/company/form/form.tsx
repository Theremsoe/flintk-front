import { AxiosPromise, AxiosResponse } from "axios";
import {
  CompanyMarketItem,
  CompanyResource,
  CompanySchema,
} from "../../../../domain/models/company";
import { CompanyContext } from "../../../../domain/contexts/company";
import { CompanyContextSchema } from "../../../../domain/contexts/schemas";
import http from "../../../../domain/http/flink";
import FormUI from "./form.ui";
import { Form as FormAnt, FormInstance, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { IntlShape, useIntl } from "react-intl";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FormMarket } from "./form.market";
import { FormFinishInfo } from "rc-field-form/es/FormContext";
import { useAsyncError } from "../../../common/handlers/ExceptionHandler";

export default function Form(): JSX.Element {
  const {
    companyContextValue,
    setCompanyContextValue,
  }: CompanyContextSchema<CompanySchema | null> = useContext(CompanyContext);
  const [storeWS, setStoreWS] = useState<AxiosPromise<CompanyResource> | null>(
    null
  );
  const intl: IntlShape = useIntl();
  const history: NavigateFunction = useNavigate();
  const [viewMarket, setViewMarket] = useState<boolean>(false);
  const [formCompany]: [FormInstance<CompanySchema>] =
    FormAnt.useForm<CompanySchema>();
  const [formMarket]: [FormInstance<CompanyMarketItem>] =
    FormAnt.useForm<CompanyMarketItem>();
  const throwError = useAsyncError();

  const saveCompany = (company: CompanySchema): void => {
    const payload: CompanyResource = {
      data: company,
      meta: {},
      jsonapi: "1.0",
    };

    const storeWS: AxiosPromise<CompanyResource> = company?.id
      ? http.patch(`/company/${company.id}`, payload)
      : http.post("/company", payload);

    storeWS
      .then(
        (
          res: AxiosResponse<CompanyResource>
        ): AxiosResponse<CompanyResource> => {
          message.success(
            intl.formatMessage({
              id: "company.status.saved",
              defaultMessage: "Company saved!",
            })
          );
          return res;
        }
      )
      .then((res: AxiosResponse<CompanyResource>): void => {
        setCompanyContextValue?.(res.data.data);
      })
      .catch((exception: Error): void => throwError(exception))
      .finally((): void => setStoreWS(null));
    setStoreWS(storeWS);
  };
  const saveMarket = (market: CompanyMarketItem): void => {
    const markets: CompanyMarketItem[] =
      formCompany.getFieldValue(["attributes", "market"]) || [];

    if (markets[market?.id]) {
      markets[market?.id] = market;
    } else {
      markets.push(market);
    }

    formCompany.setFieldsValue({
      attributes: {
        market: markets,
      },
    });

    hideMarket();
  };
  const deleteMarket = (market: CompanyMarketItem): void => {
    const markets: CompanyMarketItem[] =
      formCompany.getFieldValue(["attributes", "market"]) || [];

    formCompany.setFieldsValue({
      attributes: {
        market: markets.filter((_market): boolean => _market !== market),
      },
    });
  };
  const editMarket = (market: CompanyMarketItem, id: number): void => {
    formMarket.setFieldsValue({ ...market, id });
    showMarket();
  };
  const hideMarket = (): void => {
    setViewMarket(false);
    formMarket.resetFields();
  };
  const showMarket = (): void => setViewMarket(true);
  const goBack = (): void => history("/company");

  useEffect((): void => {
    if (companyContextValue) formCompany.setFieldsValue(companyContextValue);
  }, [companyContextValue]);

  return (
    <FormUI
      form={formCompany}
      onReset={goBack}
      okButtonProps={{ loading: !!storeWS, disabled: !!storeWS }}
      cancelButtonProps={{ disabled: !!storeWS }}
      onDeleteMarket={deleteMarket}
      onEditMarket={editMarket}
      marketButtonProps={{
        onClickCapture: showMarket,
      }}
      formProviderProps={{
        onFormFinish: (name: string, { values }: FormFinishInfo): void => {
          if (name === "company-form") saveCompany(values as CompanySchema);
          if (name === "market-form") saveMarket(values as CompanyMarketItem);
        },
      }}
    >
      <FormMarket
        modalProps={{
          visible: viewMarket,
          onCancel: hideMarket,
        }}
        formProps={{
          form: formMarket,
        }}
      />
    </FormUI>
  );
}
