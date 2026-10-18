export interface StockQuotesRate {
  no: string;
  effectiveDate: string;
  bid: number;
  ask: number;
}

export interface StockQuotesResponse {
  table: string;
  currency: string;
  code: string;
  rates: StockQuotesRate[];
}

export type StockQuotesRates = StockQuotesResponse['rates'];
