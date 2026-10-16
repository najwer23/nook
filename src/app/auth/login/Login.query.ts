import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, type ResponseBase } from '@app/config/configFetch';
import { storageItemSet } from '@app/storage/storageItemSet';

type QueryProps = {
  data?: {
    tokenJWTaccess: string;
    tokenJWTrefresh: string;
  };
} & ResponseBase;

export const queryLogin = async (body: Record<string, string>): Promise<QueryProps> => {
  const url = new URL(`${configApiOrigin()}/auth/jwt/login`);
  const options = { ...configFetch({ method: 'POST', body: body }) };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw Error(data.message);
  }

  storageItemSet(sessionStorage, 'tokenJWTaccess', data.data.tokenJWTaccess, 1000);

  return data;
};
