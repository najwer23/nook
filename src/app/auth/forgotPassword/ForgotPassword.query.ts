import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export type ForgotPasswordPayload = Record<string, string> & {
  appName: string;
};

export type ForgotPasswordResponse = ResponseBase;

export const queryForgotPassword = (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/forgot-password1`);
  return executeFetch<ForgotPasswordResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
