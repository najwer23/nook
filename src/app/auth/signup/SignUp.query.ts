import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export type SignUpPayload = Record<string, string>;

export type SignUpResponse = ResponseBase;

export const querySignUp = (payload: SignUpPayload): Promise<SignUpResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/sign-up`);
  return executeFetch<SignUpResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
