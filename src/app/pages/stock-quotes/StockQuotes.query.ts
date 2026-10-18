import { executeFetchExternal } from '@app/config/configFetch';

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

export const queryStockQuotes = (currency: string): Promise<StockQuotesResponse> => {
  const endpointUrl = new URL(`https://api.nbp.pl/api/exchangerates/rates/c/${encodeURIComponent(currency)}/last/255/`);
  endpointUrl.searchParams.set('format', 'json');

  return executeFetchExternal<StockQuotesResponse>(endpointUrl);
};
