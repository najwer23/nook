import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryRentPayload = Record<string, string> & {};

export interface QueryRentResponse extends FetchClientBaseResponse {
  data?: {};
}

export const queryRent = async (payload: QueryRentPayload): Promise<QueryRentResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}`);
  const response = await fetchClientExecute<QueryRentResponse>(
    endpointUrl,
    fetchClientConfig({ method: 'GET', body: payload }),
  );

  return response;
};
