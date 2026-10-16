import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, type ResponseBase } from '@app/config/configFetch';
import { storageItemRemove } from '@app/storage/storageItemRemove';

type QueryProps = {
  data?: {};
} & ResponseBase;

export const queryLogout = async (): Promise<QueryProps> => {
  const url = new URL(`${configApiOrigin()}/auth/jwt/logout`);
  const options = { ...configFetch({ method: 'POST' }) };
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw Error(data.message);
  }

  storageItemRemove(sessionStorage, 'tokenJWTaccess');

  return data;
};
