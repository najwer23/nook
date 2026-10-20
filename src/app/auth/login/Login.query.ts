import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';
import { storageItemSet } from '@app/storage/storageItemSet';

export type QueryLoginPayload = Record<string, string>;

export interface QueryLoginResponse extends FetchClientBaseResponse {
  data?: {
    tokenJWTaccess: string;
    tokenJWTrefresh: string;
  };
}

export const queryLogin = async (payload: QueryLoginPayload): Promise<QueryLoginResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/jwt/login`);

  const response = await fetchClientExecute<QueryLoginResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );

  if (response.data) {
    storageItemSet(sessionStorage, 'tokenJWTaccess', response.data.tokenJWTaccess, 1000);
  }

  // maybe? to keep pure, runs before react functions
  // onSuccess: (response) => {
  //   if (response.data) {
  //     storageItemSet(sessionStorage, 'tokenJWTaccess', response.data.tokenJWTaccess, 1000);
  //   }
  // },

  return response;
};
