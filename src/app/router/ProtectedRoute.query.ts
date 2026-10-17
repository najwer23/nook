import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '../config/configFetch';

export const queryCheckAccess = async (): Promise<ResponseBase> => {
  const url = new URL(`${configApiOrigin()}/auth/jwt/check-access`);
  const options = { ...configFetch({ method: 'POST' }) };
  return await executeFetch(url, options);
};
