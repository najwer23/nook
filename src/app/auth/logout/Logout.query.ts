import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';
import { storageItemRemove } from '@app/storage/storageItemRemove';

export type LogoutResponse = ResponseBase;

export const queryLogout = async (): Promise<LogoutResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/jwt/logout`);

  try {
    return await executeFetch<LogoutResponse>(endpointUrl, configFetch({ method: 'POST' }));
  } finally {
    storageItemRemove(sessionStorage, 'tokenJWTaccess');
  }
};
