import { executeFetchExternal } from '@app/config/configFetch';
import type { StockQuotesResponse } from './StockQuotes.types';

export const queryStockQuotes = (currency: string): Promise<StockQuotesResponse> => {
  const endpointUrl = new URL(`https://api.nbp.pl/api/exchangerates/rates/c/${encodeURIComponent(currency)}/last/255/`);
  endpointUrl.searchParams.set('format', 'json');

  return executeFetchExternal<StockQuotesResponse>(endpointUrl);
};
