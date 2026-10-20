import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';

export type QueryForgotPasswordPayload = Record<string, string> & {
  appName: string;
};

export type QueryForgotPasswordResponse = FetchClientBaseResponse;

export const queryForgotPassword = (payload: QueryForgotPasswordPayload): Promise<QueryForgotPasswordResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/auth/forgot-password1`);

  return fetchClientExecute<QueryForgotPasswordResponse>(
    endpointUrl,
    fetchClientConfig({
      method: 'POST',
      body: payload,
    }),
  );
};
