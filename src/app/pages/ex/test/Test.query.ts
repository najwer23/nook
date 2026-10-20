import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryTestPayload = Record<string, string>;

export type QueryTestResponse = FetchClientBaseResponse;

export const queryTest = (payload: QueryTestPayload): Promise<QueryTestResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/gym/ex/create`);

  return fetchClientExecute<QueryTestResponse>(endpointUrl, fetchClientConfig({ method: 'POST', body: payload }));
};
