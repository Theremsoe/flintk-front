import { Schema, Resource, Timestamps, Collection } from "./jsonapi";

export interface CompanyMarketItem {
  id: number;
  datetime: string;
  value: number;
}

export interface CompanyAttributes extends Timestamps {
  name: string;
  description: string;
  symbol: string;
  market: CompanyMarketItem[];
}

export type CompanySchema = Schema<CompanyAttributes>;
export type CompanyResource = Resource<CompanySchema>;
export type CompanyCollection = Collection<CompanySchema>;
