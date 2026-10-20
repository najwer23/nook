import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';
import { storageItemRemove } from '@app/storage/storageItemRemove';

export type QueryLogoutResponse = FetchClientBaseResponse;

export const queryLogout = async (): Promise<QueryLogoutResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/jwt/logout`);

  try {
    return await fetchClientExecute<QueryLogoutResponse>(endpointUrl, fetchClientConfig({ method: 'POST' }));
  } finally {
    storageItemRemove(sessionStorage, 'tokenJWTaccess');
  }
};
