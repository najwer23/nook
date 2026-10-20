import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryForgotPasswordOtpPayload = Record<string, string> & {
  otp: string;
};

export type QueryForgotPasswordOtpResponse = FetchClientBaseResponse;

export const queryForgotPasswordOtp = (
  payload: QueryForgotPasswordOtpPayload,
): Promise<QueryForgotPasswordOtpResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/forgot-password2`);

  return fetchClientExecute<QueryForgotPasswordOtpResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};
