import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export type CheckAccessResponse = ResponseBase;

export const queryCheckAccess = (): Promise<CheckAccessResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/jwt/check-access`);
  return executeFetch<CheckAccessResponse>(endpointUrl, configFetch({ method: 'POST' }));
};
