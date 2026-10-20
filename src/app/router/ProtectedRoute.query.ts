import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryCheckAccessResponse = FetchClientBaseResponse;

export const queryCheckAccess = (): Promise<QueryCheckAccessResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/jwt/check-access`);

  return fetchClientExecute<QueryCheckAccessResponse>(endpointUrl, fetchClientConfig({ method: 'POST' }));
};
