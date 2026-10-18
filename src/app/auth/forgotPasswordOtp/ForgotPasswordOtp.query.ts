import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';

export type ForgotPasswordOtpPayload = Record<string, string> & {
  otp: string;
};

export type ForgotPasswordOtpResponse = ResponseBase;

export const queryForgotPasswordOtp = (payload: ForgotPasswordOtpPayload): Promise<ForgotPasswordOtpResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/auth/forgot-password2`);
  return executeFetch<ForgotPasswordOtpResponse>(endpointUrl, configFetch({ method: 'POST', body: payload }));
};
