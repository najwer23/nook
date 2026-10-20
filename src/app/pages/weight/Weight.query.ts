import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export interface QueryWeightGetByYearResponse extends FetchClientBaseResponse {
  data: {
    weights: {
      date: string;
      weight: string;
    }[];
  };
}

export const queryWeightGetByYear = (year: string): Promise<QueryWeightGetByYearResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/weight/${encodeURIComponent(year)}`);
  return fetchClientExecute<QueryWeightGetByYearResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};

export type QueryWeightAddPayload = Record<string, string> & {};

export type QueryWeightAddResponse = FetchClientBaseResponse;

export const queryWeightAdd = (payload: QueryWeightAddPayload): Promise<QueryWeightAddResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/weight/add`);
  return fetchClientExecute<QueryWeightAddResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};
