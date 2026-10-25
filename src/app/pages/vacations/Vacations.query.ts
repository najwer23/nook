import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryMasonryPayload = Record<string, string> & {};

export interface QueryMasonryResponse extends FetchClientBaseResponse {
  data?: {};
}

export const queryMasonry = async (payload: QueryMasonryPayload): Promise<QueryMasonryResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}`);
  const response = await fetchClientExecute<QueryMasonryResponse>(
    endpointUrl,
    fetchClientConfig({ method: 'GET', body: payload }),
  );

  return response;
};
