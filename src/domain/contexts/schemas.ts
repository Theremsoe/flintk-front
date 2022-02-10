import { Dispatch, SetStateAction } from "react";

export interface CompanyContextSchema<T> {
  companyContextValue: T;
  setCompanyContextValue?: Dispatch<SetStateAction<T>>;
}
