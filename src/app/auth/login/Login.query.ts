import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';
import { storageItemSet } from '@app/storage/storageItemSet';

export type LoginPayload = Record<string, string>;

export interface LoginResponse extends ResponseBase {
  data?: {
    tokenJWTaccess: string;
    tokenJWTrefresh: string;
  };
}

export const queryLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/jwt/login`);
  const response = await executeFetch<LoginResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));

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
